import { AnswersRepository } from '../repositories/answers-repositories'
import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repositories'
import { Either, left, Right } from '@/core/either'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '../../../../core/errors/errors/resource-not-allowed-error'

interface chooseQuestionBestAnswerUseCaseRequest {
  answerId : string
  authorId : string
}
type chooseQuestionBestAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError ,{
  question:Question
}>

export class chooseQuestionBestAnswerUseCase {
  constructor(
    private answerRepository: AnswersRepository,
    private questionRepository : QuestionRepository
  ) {}

  async execute({
    answerId ,
    authorId

  }: chooseQuestionBestAnswerUseCaseRequest):Promise<chooseQuestionBestAnswerUseCaseResponse>{
    const answer = await this.answerRepository.findById(answerId)
    if(!answer){
        return left(new ResourceNotFoundError())
    }
    const question = await this.questionRepository.findById(answer.questionId.toString())

    if(!question){
        return left(new ResourceNotFoundError())
    }
    if(authorId !== question.authorId.toString()){
        return left(new NotAllowedError())
    }

    question.bestWenserId = answer.id

    await this.questionRepository.save(question)
    return new Right({
        question
    })
  }
}
