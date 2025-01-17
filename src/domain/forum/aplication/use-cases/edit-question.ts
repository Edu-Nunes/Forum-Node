import { Either, left, right } from '@/core/either';
import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/question-repositories';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { NotAllowedError } from './errors/resource-not-allowed-error';

interface editQuestionUseCaseRequest {
  authorId: string
  title : string
  questionId : string 
  content : string 
}
type editQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError ,{
  question : Question
}>
  
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
        return left(new ResourceNotFoundError())
    }
    if (authorId !== question.authorId.toString()){
        return left( new NotAllowedError() )
    }

    question.title = title
    question.content = content
    
    await this.questionRepository.save(question)
    return right({
      question
    })
  }
}
