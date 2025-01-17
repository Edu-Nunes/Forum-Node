import { InMemoryQuestionRepository } from "test/repositories/in-memory-question-repositories";
import { makeQuestion } from "test/factories/make-question";
import { DeleteQuestionUseCase } from "./delete-question";
import { UniqueId } from "@/core/entities/unique-id";
import { NotAllowedError } from "./errors/resource-not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";



let inMemoryQuestionRepository : InMemoryQuestionRepository
let sut : DeleteQuestionUseCase

describe('Delete Question', () => {
    beforeEach( () => {
        inMemoryQuestionRepository = new InMemoryQuestionRepository()
        sut = new DeleteQuestionUseCase(inMemoryQuestionRepository)
    })
    it('Should be able to delete a answer', async () => {
            const newQuestion = makeQuestion(
                {
                    authorId : new UniqueId('author-1')
                },
                new UniqueId('answer-1')
            )
            await inMemoryQuestionRepository.create(newQuestion)
            
            await sut.execute({
                questionId : 'answer-1',
                authorId : 'author-1'
            })
            expect(inMemoryQuestionRepository.items).toHaveLength(0)
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