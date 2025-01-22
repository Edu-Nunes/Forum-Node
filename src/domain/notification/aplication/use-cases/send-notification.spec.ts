import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notification-repository'
import { SendNotificationUseCase } from './send-notifications'

let inMemoryNotificationRepository : InMemoryNotificationRepository
let sut : SendNotificationUseCase

describe('send Notification', () => {
  beforeEach( () => {
    
    inMemoryNotificationRepository = new InMemoryNotificationRepository( )
    sut = new SendNotificationUseCase(inMemoryNotificationRepository)
  })

  it('Shold be able to send a notification', async () => {
    const notification = await sut.execute({
      recipientId : '1',
      title : 'Nova Notificação.',
      content:'conteudo da Notificação',
    })

    
    

    expect(notification.isRight()).toBe(true)
    expect(inMemoryNotificationRepository.items[0]).toEqual(notification.value?.notification)
   
    

  })
})

