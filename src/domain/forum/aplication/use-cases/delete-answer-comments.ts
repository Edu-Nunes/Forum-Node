import { UniqueId } from '@/core/entities/unique-id';
import { AnswersRepository } from '../repositories/answers-repositories';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerCommentsRepository } from '../repositories/answer-comment-repository';

interface DeleteAnswerCommentUseCaseRequest {
  authorId : string 
  answerCommentId : string 
}
interface DeleteAnswerCommentUseCaseResponse {}
    
 

export class DeleteAnswerCommentUseCase {
    constructor(
      private answerCommentRepository: AnswerCommentsRepository
    ) {}
  
    async execute({ authorId, answerCommentId }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
      
      const answerComment = await this.answerCommentRepository.findById(answerCommentId);
  
      if (!answerComment) {
        throw new Error('Answer Comment not found.');
      }
  
      
      if (answerComment.authorId !== authorId) {
        throw new Error('Not Allowed.');
      }

      await this.answerCommentRepository.delete(answerComment);
  
      
      return {};
        
     
    }
  }
