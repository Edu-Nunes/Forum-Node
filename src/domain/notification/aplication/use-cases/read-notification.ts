import { UniqueId } from '@/core/entities/unique-id';
import { Either, left, right } from '@/core/either';
import { Notification } from '../../enterprise/entities/notification';
import { NotificationRepository } from '../repositories/notification-repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/resource-not-allowed-error';

interface ReadNotificationUseCaseRequest {
    recipientId : UniqueId
    notificationId : UniqueId
  
}
type ReadNotificationUseCaseResponse = Either< 
  null |
  ResourceNotFoundError |
  NotAllowedError ,{
  notification : Notification
}>

export class ReadNotificationUseCase {
  constructor(private notificationsRepository: NotificationRepository) {}
  async execute({
    recipientId ,
    notificationId
  }: ReadNotificationUseCaseRequest ): Promise<ReadNotificationUseCaseResponse> {
    const notification  = await this.notificationsRepository.findById(
      notificationId
    )
    if(!notification){
        return left(new ResourceNotFoundError)
    }
    if(recipientId.toString() !== notification.recipientId.toString()){
        return left (new NotAllowedError)
    }
    
    notification.read()
    await this.notificationsRepository.save(notification)
    
    return right({notification : notification})
  }
}
