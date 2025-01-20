import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { makeAnswer } from 'test/factories/make-answer';
import { EditAnwerUseCase } from './edit-answer';
import { UniqueId } from '@/core/entities/unique-id';
import { NotAllowedError } from './errors/resource-not-allowed-error';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository';
import { makeAnswerAttachments } from 'test/factories/make-asnwer-attachment';


let inMemoryAnswerAttachmentsRepository : InMemoryAnswerAttachmentsRepository
let inMemoryAnswerRepository : InMemoryAnswerRepository
let sut : EditAnwerUseCase

describe('Edit Answer', () => {
    beforeEach( () => {
        inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
        inMemoryAnswerRepository = new InMemoryAnswerRepository(
            inMemoryAnswerAttachmentsRepository
        )
        sut = new EditAnwerUseCase(inMemoryAnswerRepository,
            inMemoryAnswerAttachmentsRepository
        )
    })
    it('Should be able to edit a answer', async () => {
        const newAnswer = makeAnswer(
            {
                authorId : new UniqueId('author-1'),
            },
            new UniqueId('answer-1')
        )
        await inMemoryAnswerRepository.create(newAnswer)
        
        inMemoryAnswerAttachmentsRepository.items.push(
            makeAnswerAttachments({
                answerId : newAnswer.id,
                attachmentId : new UniqueId('1')
            })
        )
        inMemoryAnswerAttachmentsRepository.items.push(
            makeAnswerAttachments({
                answerId : newAnswer.id,
                attachmentId : new UniqueId('1')
            })
        )
        await sut.execute({
            answerId : newAnswer.id.toString(),
            authorId : 'author-1',
            content : 'Conteudo Editado',
            attachmentIds : ['1', '3']
        })
        
        expect(inMemoryAnswerRepository.items[0]).toMatchObject({
            content : 'Conteudo Editado'
        })
        expect(inMemoryAnswerRepository.items[0].attachments.currentItems).toHaveLength(2)

        expect(inMemoryAnswerRepository.items[0].attachments.currentItems.map(attachment => attachment.attachmentId)).toEqual([
                      new UniqueId('1'),
                      new UniqueId('3')
                    ])   

    })
    it('Should not be able to edit a answer from another user', async () => {
        const newAnswer = makeAnswer(
            {
                authorId: new UniqueId('author-1'),
            },
            new UniqueId('answer-1')
        );
        await inMemoryAnswerRepository.create(newAnswer);

        const result = await sut.execute({
            answerId: newAnswer.id.toString(),
            authorId: 'author-2',  
            content: 'Conteudo Editado',
            attachmentIds : []
        })    
        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    });
})