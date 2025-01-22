import { UniqueId } from '@/core/entities/unique-id';
import { QuestionRepository } from '../repositories/question-repositories';
import { QuestionComment } from '../../enterprise/entities/question-coment';
import { QuestionCommentsRepository } from '../repositories/question-comment-repository';
import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error';

interface CommentOnQuestionUseCaseRequest {
  authorId : string 
  questionId : string 
  content : string
}
type CommentOnQuestionUseCaseResponse = Either< ResourceNotFoundError , {
    questionComment : QuestionComment
}>

export class CommentOnQuestionUseCase {
  constructor(
    private questionRepository: QuestionRepository,
    private questionCommentRepository : QuestionCommentsRepository
  ) {}

  async execute({
    authorId ,
    questionId ,
    content
  }:CommentOnQuestionUseCaseRequest ):Promise<CommentOnQuestionUseCaseResponse>{

    const question = await this.questionRepository.findById(questionId)
    if(!question){
        return left(new ResourceNotFoundError())
    }

    const questionComment = QuestionComment.create({
        authorId : new UniqueId(authorId),
        content : content,
        questionId : new UniqueId(questionId)
    })

    await this.questionCommentRepository.create(questionComment)
   

    return right({
        questionComment
    })

  }
}
