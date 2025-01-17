import { Either, right } from "@/core/either"
import { Question } from "../../enterprise/entities/question"
import { QuestionRepository } from "../repositories/question-repositories"


interface FechtRecentQuestionsRequest{
    page:number
}
type FechtRecentQuestionsResponse = Either<null, {
    questions : Question[]
}>
export class FechtRecentQuestionsUseCase{
    constructor(private questionRepository:QuestionRepository){}
    async execute({ page,}:FechtRecentQuestionsRequest):Promise<FechtRecentQuestionsResponse> {
        const questions = await this.questionRepository.findManyRecent({page})
        return right({
            questions,
        })
    }
}