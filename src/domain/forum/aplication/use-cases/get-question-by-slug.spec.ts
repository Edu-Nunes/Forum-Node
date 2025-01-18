import { InMemoryQuestionRepository } from "test/repositories/in-memory-question-repositories";
import { makeQuestion } from "test/factories/make-question";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachment-repository";

let inMemoryQuestionAttachmentRepository : InMemoryQuestionAttachmentsRepository
let inMemoryQuestionRepository : InMemoryQuestionRepository
let sut : GetQuestionBySlugUseCase

describe('Get Question by slug', () => {
    beforeEach( () => {

        inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentsRepository()
        inMemoryQuestionRepository = new InMemoryQuestionRepository(inMemoryQuestionAttachmentRepository)
        sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
    })
    it('Should be able to get a question by slug' , async () => {
        const newQuestion = makeQuestion({
            slug : Slug.createFromText('example-question')
        })
        await inMemoryQuestionRepository.create(newQuestion)

        const result = await sut.execute({
            slug : new Slug('example-question'),
        })
        
        expect(result.value?.question!.id).toBeTruthy()
        expect(result.value?.question!.title).toEqual(newQuestion.title)
    })
})