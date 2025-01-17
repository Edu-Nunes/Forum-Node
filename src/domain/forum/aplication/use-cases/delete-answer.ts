import { Either, left, right } from '@/core/either';
import { AnswersRepository } from '../repositories/answers-repositories';
import { NotAllowedError } from './errors/resource-not-allowed-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface DeleteAnswerUseCaseRequest {
  answerId: string
  authorId: string
}
type DeleteAnswerUseCaseResponse = Either< NotAllowedError | ResourceNotFoundError , {} >
  
export class DeleteAnswerUseCase {
  constructor(private answerRepository:AnswersRepository) {}
  async execute({
    authorId,
    answerId
  }: DeleteAnswerUseCaseRequest ): Promise<DeleteAnswerUseCaseResponse> {
   
    const answer = await this.answerRepository.findById(answerId)
    if(!answer){
        return left(new ResourceNotFoundError())
    }
    if (authorId !== answer.authorId.toString()){
        return left(new NotAllowedError )
    }
    
    await this.answerRepository.delete(answer)
    return right({})
  }
}
