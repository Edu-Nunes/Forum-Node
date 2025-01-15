import { InMemoryQuestionRepository } from "test/repositories/in-memory-question-repositories";

import { makeQuestion } from "test/factories/make-question";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { Slug } from "../../enterprise/entities/value-objects/slug";

let inMemoryQuestionRepository : InMemoryQuestionRepository
let sut : GetQuestionBySlugUseCase

describe('Get Question by slug', () => {
    beforeEach( () => {
        inMemoryQuestionRepository = new InMemoryQuestionRepository()
        sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
    })
    it('Should be able to get a quation by slug' , async () => {
        const newQuestion = makeQuestion({
            slug : Slug.createFromText('example-question')
        })
        await inMemoryQuestionRepository.create(newQuestion)

        const {question} = await sut.execute({
            slug : Slug.createFromText('example-question')
        })
        console.log("question found:", question)
        
        expect(question.id).toBeTruthy()
        expect(question.title).toEqual(newQuestion.title)
    })
})