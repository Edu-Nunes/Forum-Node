import { UniqueId } from "@/core/entities/unique-id";
import { Notification } from "../../enterprise/entities/notification"; 

export interface NotificationRepository{
    create(notification : Notification):Promise<void>
    findById(id : UniqueId):Promise<Notification | null>
    save(notification : Notification):Promise<void>

}


