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
}
 