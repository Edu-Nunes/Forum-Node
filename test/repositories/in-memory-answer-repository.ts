import { PaginationParams } from "@/domain/forum/enterprise/entities/repositories/pagination-params"
import { AnswersRepository } from "@/domain/forum/aplication/repositories/answers-repositories"
import { Answer } from "@/domain/forum/enterprise/entities/answer"
import { UniqueId } from "@/core/entities/unique-id"

export class InMemoryAnswerRepository implements AnswersRepository{
    public items: Answer[]=[]

    async create(answer:Answer):Promise<void>{
        this.items.push(answer)
    }
    async findById(id: string): Promise<Answer | null> {
            const answer = this.items.find( (item) => item.id.toString() === id )
            if(!answer){
                return null
            }
            return answer
        }
        async delete(answer:Answer){
            const itemIndex = this.items.findIndex((item)=>{item.id === answer.id})
            this.items.splice(itemIndex, 1)
        }
        async save(answer : Answer){
            const itemIndex = this.items.findIndex((item)=>{
                item.id === answer.id
            })
            this.items[itemIndex] = answer
        }
        async findManyByQuestionId(answerId : UniqueId , {page}:PaginationParams){
            const answerComments = this.items.filter(item => item.questionId.toString() === answerId.toString())
            .slice((page -1 )* 20, page * 20  )  
            return answerComments
        }
}
 