import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repositories'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionRepository : InMemoryQuestionRepository
let sut : CreateQuestionUseCase
describe('Create Question', () => {
  beforeEach(()=>{
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
  })

  it('Shold be ableto create a question', async () => {
    const {question} = await sut.execute({
      authorId : '1',
      title : 'Nova Pergunta.',
      content:'conteudo da pergunta'
    })
    expect(question.content).toEqual('conteudo da pergunta')
  })
})

