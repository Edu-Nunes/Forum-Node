import { Question } from "../../enterprise/entities/question"
import { Slug } from "../../enterprise/entities/value-objects/slug"
import { QuestionRepository } from "../repositories/question-repositories"


interface getQuestionBySlugRequest{
    slug:Slug
}
interface getQuestionBySlugResponse{
    question : Question
}
export class GetQuestionBySlugUseCase{
    constructor(private questionRepository:QuestionRepository){}
    async execute({ slug,}:getQuestionBySlugRequest):Promise<getQuestionBySlugResponse> {
        const question = await this.questionRepository.findBySlug(slug)
        
        if(!question){
            throw new Error('Question not Found.')
        }
        return {
            question
        }
    }
       
   

}