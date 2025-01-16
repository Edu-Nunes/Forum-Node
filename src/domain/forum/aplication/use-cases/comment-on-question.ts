import { UniqueId } from '@/core/entities/unique-id';
import { QuestionRepository } from '../repositories/question-repositories';
import { QuestionComment } from '../../enterprise/entities/question-coment';
import { QuestionCommentsRepository } from '../repositories/question-comment-repository';

interface CommentOnQuestionUseCaseRequest {
  authorId : string 
  questionId : string 
  content : string
}
interface CommentOnQuestionUseCaseResponse {
    questionComment : QuestionComment
}

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
        throw new Error('Question not found.')
    }

    const questionComment = QuestionComment.create({
        authorId : new UniqueId(authorId),
        content : content,
        questionId : new UniqueId(questionId)
    })

    await this.questionCommentRepository.create(questionComment)
   

    return {
        questionComment
    }

  }
}
