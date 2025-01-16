import { Answer } from "../../enterprise/entities/answer"
import { AnswersRepository } from "../repositories/answers-repositories"

interface FechtQuestionsAnswerUseCaseRequest{
    questionId : string 
    page:number
}
interface FechtQuestionsAnswerUseCaseResponse{
    answer : Answer[]
}
export class FetchQuestionAnswerUseCase{
    constructor(private answerRepository:AnswersRepository){}
    async execute({ questionId, page,}:FechtQuestionsAnswerUseCaseRequest):Promise<FechtQuestionsAnswerUseCaseResponse> {
        const answer = await this.answerRepository.findManyByQuestionId( questionId, {page})
        return {
            answer,
        }  
    }
}