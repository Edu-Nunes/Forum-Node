import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repositories'
import { chooseQuestionBestAnswerUseCase } from './choose-quest-best-answer'
import { makeQuestion } from 'test/factories/make-question'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueId } from '@/core/entities/unique-id'
import { NotAllowedError } from '../../../../core/errors/errors/resource-not-allowed-error'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachment-repository'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'

let inMemoryAnswerAttachmentsRepository : InMemoryAnswerAttachmentsRepository
let inMemoryQuestionRepository : InMemoryQuestionRepository
let inMemoryQuestionAttachmentRepository : InMemoryQuestionAttachmentsRepository
let inMemoryAwnserRepository : InMemoryAnswerRepository
let sut : chooseQuestionBestAnswerUseCase

describe('Choose Question best answer', () => {
  beforeEach(( )=> {
    inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentsRepository ()

    inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository ()

    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentRepository
    )

    inMemoryAwnserRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentsRepository
    )
    sut = new chooseQuestionBestAnswerUseCase(inMemoryAwnserRepository, inMemoryQuestionRepository)
  })
  it('should be able to choose the question best answer' , async () => {
    const question = makeQuestion()
    const answer = makeAnswer({questionId : question.id})
        
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


    const result = await sut.execute({
      answerId : answer.id.toString(),
      authorId : 'author-2'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)    
  })
})
