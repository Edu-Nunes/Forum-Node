import { UniqueId } from "@/core/entities/unique-id"
import { AnswerComment } from "../../enterprise/entities/answer-comment"
import { AnswerCommentsRepository } from "../repositories/answer-comment-repository"
import { Either, right } from "@/core/either"


interface FechtAnswerCommetsUseCaseRequest{
    answerId : UniqueId 
    page:number
}
type FechtAnswerCommetsUseCaseResponse = Either< null , {
    answerComments : AnswerComment[]
}>
export class FetchAnswerCommentsUseCase{
    constructor(private answerCommentsRepository:AnswerCommentsRepository   
    ){}
    async execute({ answerId , page,} : FechtAnswerCommetsUseCaseRequest)
    : Promise <FechtAnswerCommetsUseCaseResponse> {
        const answerComments = 
            await this.answerCommentsRepository.findManyByAnswerId( answerId, {page})

            return right({
                answerComments,
            })
    }
}