import { Entity } from "@/core/entities/entities";
import { UniqueId } from "@/core/entities/unique-id";

interface AttachmentProps{
    title : string 
    link : string 
    
}
export class Attachment extends Entity<AttachmentProps>{
    get tittle(){
        return this.props.title
    }
    get link(){
        return this.props.link
    }
    static create(props : AttachmentProps, id?:UniqueId){
        const attachment = new Attachment(props , id)
        return attachment
    }
}