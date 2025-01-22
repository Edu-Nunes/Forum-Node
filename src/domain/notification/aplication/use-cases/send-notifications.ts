import { UniqueId } from '@/core/entities/unique-id';
import { Either, right } from '@/core/either';
import { Notification } from '../../enterprise/entities/notification';
import { NotificationRepository } from '../repositories/notification-repository';

export interface SendNotificationUseCaseRequest {
  recipientId : string 
  title : string 
  content : string
  
}
export type SendNotificationUseCaseResponse = Either< 
  null ,{
  notification : Notification
}>

export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationRepository) {}
  async execute({
    recipientId ,
    title ,
    content,
  }: SendNotificationUseCaseRequest ): Promise<SendNotificationUseCaseResponse> {
    const notification  = Notification.create({
      recipientId: new UniqueId(recipientId),
      title,
      content,
    })
    
    this.notificationsRepository.create(notification)
    
    return right({notification : notification})
  }
}
