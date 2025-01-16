import { Question } from "@/domain/forum/enterprise/entities/question";
import { QuestionRepository } from "@/domain/forum/aplication/repositories/question-repositories";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";
import { PaginationParams } from "@/core/repositories/pagination-params";

export class InMemoryQuestionRepository implements QuestionRepository{
    public items: Question[]=[]

   
    async create(question:Question):Promise<void>{
        this.items.push(question)
    }

    async findBySlug(slug: Slug){
        const question = this.items.find( item =>  item.slug.equals(slug))
        if(!question){
            return null
        }
        return question
    }
    async findById(id: string): Promise<Question | null> {
        const question = this.items.find( (item) => item.id.toString() === id )
        if(!question){
            return null
        }
        return question
    }
    async delete(question:Question){
        const itemIndex = this.items.findIndex((item)=>{item.id === question.id})
        this.items.splice(itemIndex, 1)
    }

    async save(question : Question){
        const quest = this.items.findIndex( item => item.id === question.id )
        this.items[quest] = question
    }
    async findManyRecent({page}: PaginationParams){
        const questions = this.items
            .sort( (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice((page-1) * 20 , page * 20 )
        return questions
    
    }
}
