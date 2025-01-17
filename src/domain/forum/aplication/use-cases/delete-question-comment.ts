import { UniqueId } from '@/core/entities/unique-id';
import { QuestionRepository } from '../repositories/question-repositories';
import { QuestionComment } from '../../enterprise/entities/question-coment';
import { QuestionCommentsRepository } from '../repositories/question-comment-repository';
import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { NotAllowedError } from './errors/resource-not-allowed-error';

interface DeleteQuestionCommentUseCaseRequest {
  authorId : string 
  questionCommentId : string 
}
type  DeleteQuestionCommentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError,{}>
    

export class DeleteQuestionCommentUseCase {
    constructor(
      private questionCommentRepository: QuestionCommentsRepository
    ) {}
  
    async execute({ authorId, questionCommentId }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
      
      const questionComment = await this.questionCommentRepository.findById(questionCommentId);
  
    if (!questionComment) {
      return left(new ResourceNotFoundError())
    }

      if (questionComment.authorId !== authorId) {
        return left(new NotAllowedError())
      }

      

      await this.questionCommentRepository.delete(questionComment);
  
      
      return right({});
        
     
    }
  }
