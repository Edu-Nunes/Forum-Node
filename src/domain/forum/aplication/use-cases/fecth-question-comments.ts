import { UniqueId } from "@/core/entities/unique-id"
import { QuestionComment } from "../../enterprise/entities/question-coment"
import { QuestionCommentsRepository } from "../repositories/question-comment-repository"
import { Either, right } from "@/core/either"


interface FechtQuestionCommetsUseCaseRequest{
    questionId : UniqueId 
    page:number
}
type FechtQuestionCommetsUseCaseResponse = Either< null ,{
    questionComments : QuestionComment[]
}>
export class FetchQuestionCommentsUseCase{
    constructor(private questionCommentsRepository:QuestionCommentsRepository   
    ){}
    async execute({ questionId , page,}:FechtQuestionCommetsUseCaseRequest)
    :Promise<FechtQuestionCommetsUseCaseResponse> {

        const questionComments = 
            await this.questionCommentsRepository.findManyByQuestionId( questionId, {page})

            return right({
                questionComments,
            })
    }
}