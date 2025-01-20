import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { AnswerQuestionUseCase } from './answer-question'
import { UniqueId } from '@/core/entities/unique-id'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'

let inMemoryAnswerAtatchmentRepository : InMemoryAnswerAttachmentsRepository
let inMemoryAwnserRepository : InMemoryAnswerRepository
let sut : AnswerQuestionUseCase


describe('Create Answer', () => {
  beforeEach(( )=> {
    inMemoryAnswerAtatchmentRepository = new InMemoryAnswerAttachmentsRepository()
    inMemoryAwnserRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAtatchmentRepository
    )
    sut = new AnswerQuestionUseCase(inMemoryAwnserRepository)
  })

  it('Shold be ableto create a question', async () => {
    const result = await sut.execute({
      questionId :'1',
      instructorId : '1',
      content:'conteudo da pergunta',
      attachmentIds : ['1' , '2']
    })
    expect(result.isRight()).toBe(true)
    expect(inMemoryAwnserRepository.items[0]).toEqual(result.value?.answer)

    expect(inMemoryAwnserRepository.items[0].attachments.currentItems).toHaveLength(2)
    expect(inMemoryAwnserRepository.items[0].attachments.currentItems.map( attachment => attachment.attachmentId )).toEqual([
      new UniqueId('1'),
      new UniqueId('2')
    ])
  })
})

