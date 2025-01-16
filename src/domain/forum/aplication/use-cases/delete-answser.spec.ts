import { InMemoryAnswerRepository } from "test/repositories/in-memory-answer-repository";
import { DeleteAnswerUseCase } from "./delete-answer";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueId } from "@/core/entities/unique-id";

let inMemoryAwnserRepository : InMemoryAnswerRepository
let sut : DeleteAnswerUseCase

describe('Delete Answer', () => {
    beforeEach(()=>{
        inMemoryAwnserRepository = new InMemoryAnswerRepository()
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

        expect(()=>{
            return sut.execute({
                answerId : 'answer-1',
                authorId : 'author-2'
            })
        }).rejects.toBeInstanceOf(Error)
    })
})