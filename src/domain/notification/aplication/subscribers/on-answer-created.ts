import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { QuestionRepository } from "@/domain/forum/aplication/repositories/question-repositories";
import { AnswerCreatedEvent } from "@/domain/forum/enterprise/events/answer-created-event";
import { SendNotificationUseCase } from "../use-cases/send-notifications";


export class OnAnswerCreated implements EventHandler {
    constructor(
        private questionRepository : QuestionRepository,
        private sendNotification : SendNotificationUseCase
    ) {
        this.setupSubscriptions();
    }

    setupSubscriptions(): void {
        DomainEvents.register(this.sendNewAnswerNotification.bind(this), AnswerCreatedEvent.name);
    }

    public async sendNewAnswerNotification({ answer }: AnswerCreatedEvent): Promise<void> {
        const question = await this.questionRepository.findById(
            answer.questionId.toString()
        )
        if(question){
            await this.sendNotification.execute({
                recipientId : question?.authorId,
                title : `Nova Resposta em "${question.title.substring(0,40).concat("...")}"`,
                content : answer.excerpt,
            })    
        }
    }    
}
