import { Entity } from "../../core/entities/entities"
import { UniqueId } from "../../core/entities/unique-id"
import { Optional } from "../../core/types/optional"


interface AnswerProps{
    authorId:UniqueId
    questionId:UniqueId
    content:string 
    createdAt:Date
    updateAt?:Date
}

export class Answer extends Entity<AnswerProps>{

    get authorId():string{
        return this.props.authorId
    }
    get questionId():string{
        return this.props.questionId
    }
    get content():string{
        return this.props.content
    }
    get createdAt():string{
        return this.props.createdAt
    }
    get updateAt():string{
        return this.props.updateAt
    }

    get excerpt(){
        return this.content.substring(0,120).trimEnd().concat('...')
    }
    private touch(){
        this.props.updateAt = new Date()
    }
    set content(content : string ){
        this.touch()
        this.props.content = content

    }
    
    

    static create(props : Optional<AnswerProps, 'createdAt'>, id? : UniqueId){
            const answer = new Answer({
               ...props,
               createdAt : new Date(), 
                }, id )
            return answer
        }
}    

    
    
