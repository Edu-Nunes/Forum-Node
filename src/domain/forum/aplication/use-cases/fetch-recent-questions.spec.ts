import { InMemoryQuestionRepository } from "test/repositories/in-memory-question-repositories";
import { makeQuestion } from "test/factories/make-question";
import { FechtRecentQuestionsUseCase } from "./fecth-recent-questions";


let inMemoryQuestionRepository : InMemoryQuestionRepository
let sut : FechtRecentQuestionsUseCase

describe('Fecth recents questions', () => {
    beforeEach( () => {
        inMemoryQuestionRepository = new InMemoryQuestionRepository()
        sut = new FechtRecentQuestionsUseCase(inMemoryQuestionRepository)
    })
    it('Should be able to fecth recent questions' , async () => {
        await inMemoryQuestionRepository.create(makeQuestion({
            createdAt : new Date(2025,0,20)
        }))
        await inMemoryQuestionRepository.create(makeQuestion({
            createdAt : new Date(2025,0,18)
        }))
        await inMemoryQuestionRepository.create(makeQuestion({
            createdAt : new Date(2025,0,23)
        }))

        const result = await sut.execute({
            page: 1
        })
        expect(result.value?.questions).toEqual([
            expect.objectContaining({
                props : expect.objectContaining({createdAt : new Date(2025,0,23)})
            }),
        expect.objectContaining({
            props : expect.objectContaining({createdAt : new Date(2025,0,20 )})
        }),
        expect.objectContaining({
            props : expect.objectContaining({createdAt : new Date(2025,0,18 )})
        })
        ])
    })
    it('Should be able to fecth paginated' , async () => {
        for(let i = 1; i <= 22; i++ ){
           await inMemoryQuestionRepository.create(makeQuestion())
        }
        const result = await sut.execute({
            page: 2
        })
        expect(result.value?.questions).toHaveLength(2)
    })
})