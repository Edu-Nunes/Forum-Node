import { UniqueId } from '@/core/entities/unique-id';
import { QuestionRepository } from '../repositories/question-repositories';
import { QuestionComment } from '../../enterprise/entities/question-coment';
import { QuestionCommentsRepository } from '../repositories/question-comment-repository';

interface DeleteQuestionCommentUseCaseRequest {
  authorId : string 
  questionCommentId : string 
}
interface DeleteQuestionCommentUseCaseResponse {}
    
 

export class DeleteQuestionCommentUseCase {
    constructor(
      private questionCommentRepository: QuestionCommentsRepository
    ) {}
  
    async execute({ authorId, questionCommentId }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
      
      const questionComment = await this.questionCommentRepository.findById(questionCommentId);
  
      if (!questionComment) {
        throw new Error('Question Comment not found.');
      }
  
      
      if (questionComment.authorId !== authorId) {
        throw new Error('Not Allowed.');
      }

      await this.questionCommentRepository.delete(questionComment);
  
      
      return {};
        
     
    }
  }
