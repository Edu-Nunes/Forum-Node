import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/question-repositories';

interface editQuestionUseCaseRequest {
  authorId: string
  title : string
  questionId : string 
  content : string 
}
interface editQuestionUseCaseResponse {
  question : Question
}
  
export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository ) {}
  async execute({
    authorId,
    questionId,
    content,
    title

  }: editQuestionUseCaseRequest ): Promise<editQuestionUseCaseResponse> {
   
    const question = await this.questionRepository.findById(questionId)
    if(!question){
        throw new Error('Answer not found.')
    }
    if (authorId !== question.authorId.toString()){
        throw new Error('Not allowed.')
    }

    question.title = title
    question.content = content
    
    await this.questionRepository.save(question)
    return {
      question
    }
  }
}
