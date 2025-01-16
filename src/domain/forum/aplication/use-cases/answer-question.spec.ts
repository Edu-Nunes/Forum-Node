import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAwnserRepository : InMemoryAnswerRepository
let sut : AnswerQuestionUseCase
describe('Create Question', () => {
  beforeEach(( )=> {
    inMemoryAwnserRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(inMemoryAwnserRepository)
  })

  it('Shold be ableto create a question', async () => {
    const {answer} = await sut.execute({
      questionId :'1',
      instructorId : '1',
      content:'conteudo da pergunta'
    })
    expect(answer.content).toEqual('conteudo da pergunta')
    expect(inMemoryAwnserRepository.items[0].id).toEqual(answer.id)
  })
})
