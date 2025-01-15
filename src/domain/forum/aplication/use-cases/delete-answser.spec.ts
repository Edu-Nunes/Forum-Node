import { InMemoryAwnserRepository } from "test/repositories/in-memory-awnser-repository";
import { makeAnswer } from "test/factories/make-answer";
import { DeleteAnswerUseCase } from "./delete-answer";
import { UniqueId } from "@/core/entities/unique-id";

let inMemoryAnswerRepository :InMemoryAwnserRepository
let sut : DeleteAnswerUseCase

describe('Delete Answer', () => {
    beforeEach( () => {
        inMemoryAnswerRepository = new InMemoryAwnserRepository()
        sut = new DeleteAnswerUseCase(inMemoryAnswerRepository)
    })
    it('it shold be able delete a answer from another user' , async () => {

        const newAnswer = makeAnswer(
        {
            authorId : new UniqueId('author-1')
        },
        new UniqueId('answer-1'))
        
        await inMemoryAnswerRepository.create(newAnswer)

        expect(()=> {
            return sut.execute({
                answerId : 'answer-1',
                authorId : 'author-2'
            }) 
        }).rejects.toBeInstanceOf(Error)
    })
})