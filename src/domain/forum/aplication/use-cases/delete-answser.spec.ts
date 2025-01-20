import { InMemoryAnswerRepository } from "test/repositories/in-memory-answer-repository";
import { DeleteAnswerUseCase } from "./delete-answer";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueId } from "@/core/entities/unique-id";
import { NotAllowedError } from "./errors/resource-not-allowed-error";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments-repository";
import { makeAnswerAttachments } from "test/factories/make-asnwer-attachment";


let inMemoryAnswerAttachmentsRepository : InMemoryAnswerAttachmentsRepository
let inMemoryAwnserRepository : InMemoryAnswerRepository
let sut : DeleteAnswerUseCase

describe('Delete Answer', () => {
    beforeEach(()=>{
        inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
        inMemoryAwnserRepository = new InMemoryAnswerRepository(
            inMemoryAnswerAttachmentsRepository
        )
        sut = new DeleteAnswerUseCase(inMemoryAwnserRepository)
    })
    it('Should be able to delete a answer', async () => {
        const newAnswer = makeAnswer(
            {
                authorId : new UniqueId('author-1')
            },
            new UniqueId('answer-1')
        )
        await inMemoryAwnserRepository.create(newAnswer)

        inMemoryAnswerAttachmentsRepository.items.push(
            makeAnswerAttachments({
                answerId : new UniqueId('question-1'),
                attachmentId : new UniqueId('1')
            })
        )
        inMemoryAnswerAttachmentsRepository.items.push(
            makeAnswerAttachments({
                answerId : new UniqueId('question-1'),
                attachmentId : new UniqueId('2')
            })
        )

        await sut.execute({
            answerId : 'answer-1',
            authorId : 'author-1'
        })
        expect(inMemoryAwnserRepository.items).toHaveLength(0)
    })
    it('Shold be able to delete a answer from another user' , async()=>{
        const newAnswer = makeAnswer(
            {
                authorId : new UniqueId('author-1')
            },
            new UniqueId('answer-1')
        )
        await inMemoryAwnserRepository.create(newAnswer)

        const result = await sut.execute({
            answerId : 'answer-1',
            authorId : 'author-2'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
        expect(inMemoryAnswerAttachmentsRepository.items).toHaveLength(0)
    })
})