import { makeAnswer } from "test/factories/make-answer"
import { OnAnswerCreated } from "./on-answer-created"

import { InMemoryAnswerRepository } from "test/repositories/in-memory-answer-repository"
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments-repository"
import { InMemoryQuestionRepository } from "test/repositories/in-memory-question-repositories"
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachment-repository"
import { SendNotificationUseCase } from "../use-cases/send-notifications"
import { InMemoryNotificationRepository } from "test/repositories/in-memory-notification-repository"


let inMemoryQuestionAttachmentsRepository : InMemoryQuestionAttachmentsRepository
let inMemoryQuestionRepository : InMemoryQuestionRepository
let inMemoryAnswerAttachmentsRepository : InMemoryAnswerAttachmentsRepository
let inMemoryAnswerRepository : InMemoryAnswerRepository
let inMemoryNotificationRepository : InMemoryNotificationRepository
let sendNotificationUseCase : SendNotificationUseCase

describe('On answer created', () => {
    beforeEach(() => {
        inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
        inMemoryQuestionRepository = new InMemoryQuestionRepository(inMemoryQuestionAttachmentsRepository)
        inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
        inMemoryAnswerRepository = new InMemoryAnswerRepository(inMemoryAnswerAttachmentsRepository)
        inMemoryNotificationRepository = new InMemoryNotificationRepository()
        sendNotificationUseCase = new SendNotificationUseCase(inMemoryNotificationRepository)
    })
    it('Should send a notification when an answer is created', () => {
      
        const onAnswerCreated = new OnAnswerCreated(inMemoryQuestionRepository, sendNotificationUseCase)
    
      
        const endNewAnswerNotificationSpy = vi.spyOn(onAnswerCreated, 'setupSubscriptions')
    
       
        onAnswerCreated.setupSubscriptions()

        const answer = makeAnswer()
    
    
        inMemoryAnswerRepository.create(answer)
    
      
        expect(endNewAnswerNotificationSpy).toHaveBeenCalled()
        expect(endNewAnswerNotificationSpy).toHaveBeenLastCalledWith()  // 
    
       
        endNewAnswerNotificationSpy.mockRestore()
    })
    
})   