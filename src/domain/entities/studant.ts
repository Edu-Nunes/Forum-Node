import { Entity } from "../../core/entities/entities"
import { UniqueId } from "../../core/entities/unique-id"


interface StudantProps{
    name : string
    id? : UniqueId
}

export class Studant extends Entity<StudantProps>{
    static create(  props : StudantProps, id? : UniqueId,){
        const student = new Studant({...props,id })
            return student           
    }
}
      
