import { InMemoryQuestionRepository } from "test/repositories/in-memory-question-repositories";
import { makeQuestion } from "test/factories/make-question";
import { UniqueId } from "@/core/entities/unique-id";
import { EditQuestionUseCase } from "./edit-question";
import { NotAllowedError } from "../../../../core/errors/errors/resource-not-allowed-error";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachment-repository";
import { makeQuestionAttachments } from "test/factories/make-question-attachment";



let inMemoryQuestionRepository : InMemoryQuestionRepository
let inMemoryQuestionAttachmentRepository : InMemoryQuestionAttachmentsRepository
let sut : EditQuestionUseCase

describe('Edit Question', () => {
    beforeEach( () => {
        inMemoryQuestionRepository = new InMemoryQuestionRepository(
            inMemoryQuestionAttachmentRepository
        )
        inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentsRepository()
        sut = new EditQuestionUseCase(

            inMemoryQuestionRepository, 
            inMemoryQuestionAttachmentRepository

        )
       
    })
    it('Should be able to edit a question', async () => {
        const newQuestion = makeQuestion(
            {
                title : 'Titulo1',
                authorId : new UniqueId('author-1'),
                
            },
            new UniqueId('answer-1')
        )
        await inMemoryQuestionRepository.create(newQuestion)
        

        inMemoryQuestionAttachmentRepository.items.push(
            makeQuestionAttachments({
                questionId : newQuestion.id,
                attachmentId : new UniqueId('1')
            }),
            makeQuestionAttachments({
                questionId : newQuestion.id,
                attachmentId : new UniqueId('2')
            })
        )
        await sut.execute({
            questionId : newQuestion.id.toString(),
            authorId : 'author-1',
            content : 'Conteudo Editado',
            title : 'Titulo editado',
            attachmentsIds : ['1', '3']
        })
        expect(inMemoryQuestionRepository.items[0]).toMatchObject({
            title : 'Titulo editado',
            content : 'Conteudo Editado'
        })    
        expect(inMemoryQuestionRepository.items[0].attachment.currentItems).toHaveLength(2)
            expect(inMemoryQuestionRepository.items[0].attachment.currentItems.map(attachment => attachment.attachmentId)).toEqual([
              new UniqueId('1'),
              new UniqueId('3')
            ])   
    })
    it('Should not be able to edit a question from another user', async () => {
        const newQuestion = makeQuestion(
            {
                authorId: new UniqueId('author-1'),
            },
            new UniqueId('question-1')
        );
        await inMemoryQuestionRepository.create(newQuestion);
        
        
        const result = await sut.execute({
            questionId: newQuestion.id.toString(),
            authorId: 'author-2',  
            content: 'Conteudo Editado',
            title: 'Titulo editado',
            attachmentsIds : []
        })
        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    });
});