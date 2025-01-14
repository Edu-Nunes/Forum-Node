import {expect, test}  from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answers-repositories'
import { Answer } from '../entities/answer'


const fakeAnswerRepository: AnswersRepository = {
    create : async (answer : Answer ) => {
        return 
    }
}


test('create an answer', async () => {
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

    const answe = await answerQuestion.execute({
        content : 'Nova Resposta',
        instructorId : '1',
        questionId : '1',
    })
    
    expect(answe.getContent()).toEqual('Nova Resposta')
})

