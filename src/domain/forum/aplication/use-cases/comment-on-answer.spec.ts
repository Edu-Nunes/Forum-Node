import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { CommentOnAnswerUseCase } from './comment-on-awnser'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comment-repository'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository 
let sut: CommentOnAnswerUseCase

describe('Comment on answer', () => {
  beforeEach(() => {
    
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository() 

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentRepository 
    )
  })
  describe('Comment on answer', ()=>{
    it('Shold be able to comment a quastion', async () => {
      const answer = makeAnswer()
      await inMemoryAnswerRepository.create(answer)

      await sut.execute({
        answerId : answer.id.toString(),
        authorId : answer.authorId.toString(),
        content :  'Comentario teste'
      })
      expect(inMemoryAnswerRepository.items[0].content).toEqual(answer.content)
    })
  })
})

