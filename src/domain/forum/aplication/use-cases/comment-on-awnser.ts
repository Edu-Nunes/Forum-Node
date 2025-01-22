import { UniqueId } from '@/core/entities/unique-id';
import { AnswerCommentsRepository } from '../repositories/answer-comment-repository';
import { AnswersRepository } from '../repositories/answers-repositories';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError, } from '../../../../core/errors/errors/resource-not-found-error';

interface CommentOnAnswerUseCaseRequest {
  authorId : string 
  answerId : string 
  content : string
}
type CommentOnAnswerUseCaseResponse= Either< ResourceNotFoundError, {
    answerComment : AnswerComment
}>

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
        return left(new ResourceNotFoundError())
    }

    const answerComment = AnswerComment.create({
        authorId : new UniqueId(authorId),
        content,
        answerId : new UniqueId(answerId)
    })

    await this.answerCommentRepository.create(answerComment)
   

    return right({
        answerComment
    })

  }
}
