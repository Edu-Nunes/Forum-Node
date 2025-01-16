import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repositories'
import { CommentOnQuestionUseCase } from './comment-on-question'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comments'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository 
let sut: CommentOnQuestionUseCase

describe('Comment on question', () => {
  beforeEach(() => {
    
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository() 

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentRepository 
    )
  })
  describe('Comment on question', ()=>{
    it('Shold be able to comment a quastion', async () => {
      const question = makeQuestion()
      await inMemoryQuestionRepository.create(question)

      await sut.execute({
        questionId : question.id.toString(),
        authorId : question.authorId.toString(),
        content :  'Comentario teste'
      })
      expect(inMemoryQuestionRepository.items[0].content).toEqual(question.content)
    })
  })
})

