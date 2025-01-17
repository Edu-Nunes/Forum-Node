import { InMemoryAnswerRepository } from "test/repositories/in-memory-answer-repository";
import { FetchQuestionAnswerUseCase } from "./fecth-question-answer";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueId } from "@/core/entities/unique-id";


let inMemoryAnswerRepository : InMemoryAnswerRepository
let sut : FetchQuestionAnswerUseCase

describe('Fecth recents questions', () => {
    beforeEach( () => {
        inMemoryAnswerRepository = new InMemoryAnswerRepository()
        sut = new FetchQuestionAnswerUseCase(inMemoryAnswerRepository)
    })
    it('Should be able to fecth recent questions' , async () => {
        
        await inMemoryAnswerRepository.create(makeAnswer(
            {questionId : new UniqueId('1')}
        ))
        await inMemoryAnswerRepository.create(makeAnswer(
            {questionId : new UniqueId('1')}
        ))
        await inMemoryAnswerRepository.create(makeAnswer(
            {questionId : new UniqueId('1')}
        ))
        const  result  = await sut.execute({
            questionId: new UniqueId('1'),
            page:1
        })
        expect(result.value?.answer).toHaveLength(3)
    })
    it('Should be able to fecth pagineted answers ' , async () => {
        for(let i = 1; i <= 22 ; i++){
            await inMemoryAnswerRepository.create(makeAnswer({
                questionId : new UniqueId('question-1'),
            }))
        }
        const result = await sut.execute({
            questionId :new UniqueId('question-1'),
            page:2
        })
        expect(result.value?.answer).toHaveLength(2)
    })
})