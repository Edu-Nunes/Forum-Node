import { UniqueId } from "@/core/entities/unique-id"
import { PaginationParams } from "@/domain/forum/enterprise/entities/repositories/pagination-params"
import { QuestionCommentsRepository } from "@/domain/forum/aplication/repositories/question-comment-repository"
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-coment"


export class InMemoryQuestionCommentRepository implements QuestionCommentsRepository{
    public items: QuestionComment[]=[]

    async create(questionComment:QuestionComment):Promise<void>{
        this.items.push(questionComment)
    }
    async findById(id: string){
        const question = this.items.find((item)=>item.id.toString() === id )
        if(!question){
            return 
        }
        return question
    }
    async delete(questionComment: QuestionComment){
        const itemIndex = this.items.findIndex(
            ( item ) => { item.id === questionComment.id }
        )
        this.items.splice(itemIndex, 1)
    }
    async findManyByQuestionId(questionId : UniqueId , {page}:PaginationParams){
        const questionComment = this.items.filter(item => item.questionId.toString() === questionId.toString())
        .slice((page -1 )* 20, page * 20  )  
        return questionComment
    }
}
 