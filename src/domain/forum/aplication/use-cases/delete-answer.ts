import { AnswersRepository } from '../repositories/answers-repositories';

interface DeleteAnswerUseCaseRequest {
  questionId:string
}
interface DeleteAnswerUseCaseResponse {}
  
export class DeleteAnswerUseCase {
  constructor(private questionRepository: AnswersRepository) {}
  async execute({
    questionId
  }: DeleteAnswerUseCaseRequest ): Promise<DeleteAnswerUseCaseResponse> {
   
    const question = await this.questionRepository.findById(questionId)
    if(!question){
        throw new Error('Answer not found.')
    }
    await this.questionRepository.delete(question)
    return {}
  }
}
