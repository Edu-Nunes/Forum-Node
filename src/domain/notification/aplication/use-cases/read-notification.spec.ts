import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notification-repository'
import { ReadNotificationUseCase } from './read-notification'
import { makeNotification } from 'test/factories/make-notification'
import { UniqueId } from '@/core/entities/unique-id'
import { NotAllowedError } from '@/core/errors/errors/resource-not-allowed-error'

let inMemoryNotificationRepository : InMemoryNotificationRepository
let sut : ReadNotificationUseCase

describe('read Notification', () => {
  beforeEach( () => {
    
    inMemoryNotificationRepository = new InMemoryNotificationRepository( )
    sut = new ReadNotificationUseCase(inMemoryNotificationRepository)
  })

  it('Shold be able to read a notification', async () => {
    const notification =  makeNotification()

    inMemoryNotificationRepository.create(notification)

   
    const result = await sut.execute({
      recipientId : new UniqueId(notification.recipientId.toString()),
      notificationId : new UniqueId(notification.id.toString())
    })
    
    

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationRepository.items[0].readAt).toEqual(expect.any(Date))
  })
  it('not should not be able to read others notification',async () => {
    const notification = makeNotification({
      recipientId : new UniqueId('notificação-1')
    })
    await inMemoryNotificationRepository.create(notification)

    const result = await sut.execute({
      notificationId : notification.id,
      recipientId :  new UniqueId('notificação-2')
    })
    expect(result.value).instanceOf(NotAllowedError)
  })
})
