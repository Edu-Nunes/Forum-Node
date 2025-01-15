import { QuestionRepository } from '../repositories/question-repositories';

interface DeleteQuestionUseCaseRequest {
  questionId:string
}
interface DeleteQuestionUseCaseResponse {}
  
export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}
  async execute({
    questionId
  }: DeleteQuestionUseCaseRequest ): Promise<DeleteQuestionUseCaseResponse> {
   
    const question = await this.questionRepository.findById(questionId)
    if(!question){
        throw new Error('Question not found.')
    }
    await this.questionRepository.delete(question)
    return {}
  }
}
