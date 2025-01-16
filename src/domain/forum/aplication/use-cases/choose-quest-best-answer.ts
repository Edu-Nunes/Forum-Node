import { AnswersRepository } from '../repositories/answers-repositories'
import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repositories'

interface chooseQuestionBestAnswerUseCaseRequest {
  answerId : string
  authorId : string
}
interface chooseQuestionBestAnswerUseCaseResponse {
  question:Question
}

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
        throw new Error('Awnser not found.')
    }
    const question = await this.questionRepository.findById(answer.questionId.toString())

    if(!question){
        throw new Error('Question not found.')
    }
    if(authorId !== question.authorId.toString()){
        throw new Error('Not Allowed.')
    }

    question.bestWenserId = answer.id

    await this.questionRepository.save(question)
    return {
        question
    }
  }
}
