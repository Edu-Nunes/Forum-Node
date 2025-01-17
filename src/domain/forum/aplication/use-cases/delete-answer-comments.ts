import { UniqueId } from '@/core/entities/unique-id';
import { AnswersRepository } from '../repositories/answers-repositories';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerCommentsRepository } from '../repositories/answer-comment-repository';
import { Either, left, Left, right } from '@/core/either';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { NotAllowedError } from './errors/resource-not-allowed-error';

interface DeleteAnswerCommentUseCaseRequest {
  authorId : string 
  answerCommentId : string 
}
type  DeleteAnswerCommentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError , {}>
    
 

export class DeleteAnswerCommentUseCase {
    constructor(
      private answerCommentRepository: AnswerCommentsRepository
    ) {}
  
    async execute({ authorId, answerCommentId }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
      
      const answerComment = await this.answerCommentRepository.findById(answerCommentId);
  
      if (!answerComment) {
        return left( new ResourceNotFoundError())
      }
  
      
      if (answerComment.authorId !== authorId) {
        return left( new NotAllowedError() )
      }

      await this.answerCommentRepository.delete(answerComment);
  
      
      return right({});
        
     
    }
  }
