import { Either, left, right } from '@/core/either';
import { QuestionRepository } from '../repositories/question-repositories';
import { NotAllowedError } from '../../../../core/errors/errors/resource-not-allowed-error';
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error';

interface DeleteQuestionUseCaseRequest {
  questionId: string
  authorId: string
}
type DeleteQuestionUseCaseResponse = Either<ResourceNotFoundError|NotAllowedError,{}>
  
export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionRepository ) {}
  async execute({
    authorId,
    questionId
  }: DeleteQuestionUseCaseRequest ): Promise<DeleteQuestionUseCaseResponse> {
   
    const question = await this.questionRepository.findById(questionId)

    if(!question){
        return left(new ResourceNotFoundError())
    }
    if (authorId !== question.authorId.toString()){
        return left(new NotAllowedError())
    }
    
    await this.questionRepository.delete(question)
    return right({})
  }
}
