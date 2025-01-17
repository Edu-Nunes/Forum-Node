
import { UniqueId } from '@/core/entities/unique-id';
import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/question-repositories';
import { Either, right } from '@/core/either';

interface CreateQuestionUseCaseRequest {
  authorId : string 
  title : string 
  content : string
}
type CreateQuestionUseCaseResponse = Either< null ,{
  question : Question
}>

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}
  async execute({
    authorId ,
    title ,
    content
  }: CreateQuestionUseCaseRequest ): Promise<CreateQuestionUseCaseResponse> {
    const question  = Question.create({
      authorId: new UniqueId(authorId),
      title,
      content,
    })
    await this.questionRepository.create(question)
    return right({question : question})
  }
}
