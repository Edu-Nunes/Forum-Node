import { Either, left, right } from "@/core/either"
import { Question } from "../../enterprise/entities/question"
import { Slug } from "../../enterprise/entities/value-objects/slug"
import { QuestionRepository } from "../repositories/question-repositories"
import { ResourceNotFoundError } from "../../../../core/errors/errors/resource-not-found-error"


interface getQuestionBySlugRequest{
    slug:Slug
}
type getQuestionBySlugResponse = Either< ResourceNotFoundError , {
    question : Question
}>
export class GetQuestionBySlugUseCase{
    constructor(private questionRepository:QuestionRepository){}
    async execute({ slug,}:getQuestionBySlugRequest):Promise<getQuestionBySlugResponse> {
        const question = await this.questionRepository.findBySlug(slug)
        
        if(!question){
            return left(new ResourceNotFoundError())
        }
        return right({
            question
        })
    }
}