import { AnswersRepository } from '../repositories/answers-repositories';

interface DeleteAnswerUseCaseRequest {
  answerId: string
  authorId: string
}
interface DeleteAnswerUseCaseResponse {}
  
export class DeleteAnswerUseCase {
  constructor(private answerRepository:AnswersRepository) {}
  async execute({
    authorId,
    answerId
  }: DeleteAnswerUseCaseRequest ): Promise<DeleteAnswerUseCaseResponse> {
   
    const answer = await this.answerRepository.findById(answerId)
    if(!answer){
        throw new Error('Answer not found.')
    }
    if (authorId !== answer.authorId.toString()){
        throw new Error('Not allowed.')
    }
    
    await this.answerRepository.delete(answer)
    return {}
  }
}
