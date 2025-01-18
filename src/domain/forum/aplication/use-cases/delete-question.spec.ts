import { InMemoryQuestionRepository } from "test/repositories/in-memory-question-repositories";
import { makeQuestion } from "test/factories/make-question";
import { DeleteQuestionUseCase } from "./delete-question";
import { UniqueId } from "@/core/entities/unique-id";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachment-repository";
import { makeQuestionAttachments } from "test/factories/make-question-attachment";


let inMemoryQuestionRepository : InMemoryQuestionRepository
let inMemoryQuestionAttachmentRepository : InMemoryQuestionAttachmentsRepository
let sut : DeleteQuestionUseCase

describe('Delete Question', () => {
    beforeEach( () => {

        inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentsRepository()
        inMemoryQuestionRepository = new InMemoryQuestionRepository(
            inMemoryQuestionAttachmentRepository,
        )
        sut = new DeleteQuestionUseCase(inMemoryQuestionRepository)
    })
    it('Should be able to delete a question', async () => {
            const newQuestion = makeQuestion(
                {
                    authorId : new UniqueId('author-1')
                },
                new UniqueId('question-1')
            )

            await inMemoryQuestionRepository.create(newQuestion)

            inMemoryQuestionAttachmentRepository.items.push(
                makeQuestionAttachments({
                    questionId : new UniqueId('question-1'),
                    attachmentId : new UniqueId('1')
                })
            )
            inMemoryQuestionAttachmentRepository.items.push(
                makeQuestionAttachments({
                    questionId : new UniqueId('question-1'),
                    attachmentId : new UniqueId('2')
                })
            )
            await sut.execute({
                questionId : 'question-1',
                authorId : 'author-1'
            })
            expect(inMemoryQuestionRepository.items).toHaveLength(0)
            expect(inMemoryQuestionAttachmentRepository.items).toHaveLength(0)
        })
        it('Shold be able to delete a question from another user' , async()=>{
                const newQuestion = makeQuestion(
                    {
                        authorId : new UniqueId('author-1')
                    },
                    new UniqueId('question-1')
                )
                await inMemoryQuestionRepository.create(newQuestion)
        
                
                const result = await sut.execute({
                    questionId : 'answer-1',
                    authorId : 'author-2'
                })

                expect(result.isLeft()).toBe(true)
                expect(result.value).toBeInstanceOf(ResourceNotFoundError)
            })
})