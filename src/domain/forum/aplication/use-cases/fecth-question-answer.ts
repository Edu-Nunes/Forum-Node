import { Either, right } from "@/core/either"
import { Answer } from "../../enterprise/entities/answer"
import { AnswersRepository } from "../repositories/answers-repositories"
import { UniqueId } from "@/core/entities/unique-id"

interface FechtQuestionsAnswerUseCaseRequest{
    questionId : UniqueId 
    page:number
}
type FechtQuestionsAnswerUseCaseResponse = Either< null ,{
    answer : Answer[]
}>
export class FetchQuestionAnswerUseCase{
    constructor(private answerRepository:AnswersRepository){}
    async execute({ questionId, page,}:FechtQuestionsAnswerUseCaseRequest):Promise<FechtQuestionsAnswerUseCaseResponse> {
        const answer = await this.answerRepository.findManyByQuestionId( questionId , {page})
        return right({
            answer,
        })
    }
}