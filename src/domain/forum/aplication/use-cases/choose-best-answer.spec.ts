import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repositories'
import { chooseQuestionBestAnswerUseCase } from './choose-quest-best-answer'
import { makeQuestion } from 'test/factories/make-question'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueId } from '@/core/entities/unique-id'


let inMemoryQuestionRepository : InMemoryQuestionRepository
let inMemoryAwnserRepository : InMemoryAnswerRepository
let sut : chooseQuestionBestAnswerUseCase

describe('Choose Question best answer', () => {
  beforeEach(( )=> {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    inMemoryAwnserRepository = new InMemoryAnswerRepository()
    sut = new chooseQuestionBestAnswerUseCase(inMemoryAwnserRepository, inMemoryQuestionRepository)
  })
  it('It shold be able to choose the question best answer' , async () => {
    const question = makeQuestion()
    const answer = makeAnswer(
        {questionId : question.id}
    )

    await inMemoryQuestionRepository.create(question)
    await inMemoryAwnserRepository.create(answer)

    await sut.execute({
        answerId : answer.id.toString(),
        authorId : question.authorId.toString()
    })

    expect(inMemoryQuestionRepository.items[0].bestAnswerId).toEqual(answer.id.toString())
  })
  it('It shold  not be able to choose another user question best answer' , async () => {
    const question = makeQuestion({
        authorId : new UniqueId('autor-1')
    })
    const answer = makeAnswer(
        {questionId : question.id}
    )
    await inMemoryQuestionRepository.create(question)
    await inMemoryAwnserRepository.create(answer)

    expect(()=>{
        return  sut.execute({
                answerId : answer.id.toString(),
                authorId : 'author-2'
            })
    }).rejects.toBeInstanceOf(Error)
    
  })
})
