import { InMemoryQuestionRepository } from "test/repositories/in-memory-question-repositories";
import { makeQuestion } from "test/factories/make-question";
import { DeleteQuestionUseCase } from "./delete-question";
import { UniqueId } from "@/core/entities/unique-id";



let inMemoryQuestionRepository : InMemoryQuestionRepository
let sut : DeleteQuestionUseCase

describe('Delete Question', () => {
    beforeEach( () => {
        inMemoryQuestionRepository = new InMemoryQuestionRepository()
        sut = new DeleteQuestionUseCase(inMemoryQuestionRepository)
    })
    it('it shold be able delete a question' , async () => {

        const newQuestion = makeQuestion({}, new UniqueId('question-1'))
        
        await inMemoryQuestionRepository.create(newQuestion)
   


        await sut.execute({
            questionId : 'question-1'
        })
        expect(inMemoryQuestionRepository.items).toHaveLength(0)
    })
})