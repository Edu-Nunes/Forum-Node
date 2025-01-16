import { UniqueId } from '@/core/entities/unique-id';
import { AnswerCommentsRepository } from '../repositories/answer-comment-repository';
import { AnswersRepository } from '../repositories/answers-repositories';
import { AnswerComment } from '../../enterprise/entities/answer-comment';

interface CommentOnAnswerUseCaseRequest {
  authorId : string 
  answerId : string 
  content : string
}
interface CommentOnAnswerUseCaseResponse {
    answerComment : AnswerComment
}

export class CommentOnAnswerUseCase{
  constructor(
    private answerRepository: AnswersRepository,
    private answerCommentRepository : AnswerCommentsRepository
  ) {}

  async execute({
    authorId ,
    answerId ,
    content
  }:CommentOnAnswerUseCaseRequest ):Promise<CommentOnAnswerUseCaseResponse>{

    const answer = await this.answerRepository.findById(answerId)
    if(!answer){
        throw new Error('Question not found.')
    }

    const answerComment = AnswerComment.create({
        authorId : new UniqueId(authorId),
        content,
        answerId : new UniqueId(answerId)
    })

    await this.answerCommentRepository.create(answerComment)
   

    return {
        answerComment
    }

  }
}
