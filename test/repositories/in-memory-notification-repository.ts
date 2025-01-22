import { NotificationRepository } from "@/domain/notification/aplication/repositories/notification-repository" 
import { Notification } from "@/domain/notification/enterprise/entities/notification"
import { UniqueId } from "@/core/entities/unique-id"

export class InMemoryNotificationRepository implements NotificationRepository{
    public items: Notification[]=[]

    async create(notification:Notification):Promise<void>{
        this.items.push(notification)
    }
    async findById(id: UniqueId){
        const notification = this.items.find( (item) => 
            item.id.toString() === id.toString()
        )
        return notification || null
    }
    async save(notification : Notification){
        const itemIndex = this.items.findIndex((item)=>{ item.id.toString() === notification.id.toString()})
        this.items[itemIndex] = notification
    }  
}
