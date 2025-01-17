import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { makeAnswer } from 'test/factories/make-answer';
import { EditAnwerUseCase } from './edit-answer';
import { UniqueId } from '@/core/entities/unique-id';
import { NotAllowedError } from './errors/resource-not-allowed-error';
UniqueId

let inMemoryAnswerRepository : InMemoryAnswerRepository
let sut : EditAnwerUseCase

describe('Edit Answer', () => {
    beforeEach( () => {
        inMemoryAnswerRepository = new InMemoryAnswerRepository()
        sut = new EditAnwerUseCase(inMemoryAnswerRepository)
    })
    it('Should be able to edit a answer', async () => {
        const newAnswer = makeAnswer(
            {
                authorId : new UniqueId('author-1'),
            },
            new UniqueId('answer-1')
        )
        await inMemoryAnswerRepository.create(newAnswer)
        
        await sut.execute({
            answerId : newAnswer.id.toString(),
            authorId : 'author-1',
            content : 'Conteudo Editado',
            
        })
        expect(inMemoryAnswerRepository.items[0]).toMatchObject({
            content : 'Conteudo Editado'
        })       
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
        })    
        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    });
});