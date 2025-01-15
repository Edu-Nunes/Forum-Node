import { AnswersRepository } from "@/domain/forum/aplication/repositories/answers-repositories"
import { Answer } from "@/domain/forum/enterprise/entities/answer"

export class InMemoryAwnserRepository implements AnswersRepository{
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
}
 