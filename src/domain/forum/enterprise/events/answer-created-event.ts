import { UniqueId } from "@/core/entities/unique-id";
import { DomainEvent } from "@/core/events/domain-event";
import { Answer } from "../entities/answer";


export class AnswerCreatedEvent implements DomainEvent{
    public ocurredAt: Date;
    public answer : Answer 

    constructor(answer : Answer ){
        this.answer = answer
        this.ocurredAt = new Date()
    }
    getAggregateId(): UniqueId {
        return this.answer.id
    }
}