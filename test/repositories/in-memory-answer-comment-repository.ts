import { UniqueId } from "@/core/entities/unique-id"
import { PaginationParams } from "@/domain/forum/enterprise/entities/repositories/pagination-params"
import { AnswerCommentsRepository } from "@/domain/forum/aplication/repositories/answer-comment-repository"
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment"



export class InMemoryAnswerCommentRepository implements AnswerCommentsRepository{
    public items: AnswerComment[]=[]

    async create(answerComment:AnswerComment):Promise<void>{
        this.items.push(answerComment)
    }

   async findById(id: string){
           const answerComment = this.items.find((item)=>item.id.toString() === id )
           if(!answerComment){
               return null
           }
           return answerComment
       }
    async delete(answerComment: AnswerComment){
        const itemIndex = this.items.findIndex(
            ( item ) => { item.id === answerComment.id }
        )
        this.items.splice(itemIndex, 1)
    }  
    async findManyByAnswerId(answerId: UniqueId, params: PaginationParams){
        const answerComments = this.items
        .filter( item => item.answerId.toString() === answerId.toString())
        .slice( (params.page - 1) * 20 , params.page * 20 )

        return answerComments
    } 
       
}
 