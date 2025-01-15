import { UniqueId } from "@/core/entities/unique-id";
import { Answer, AnswerProps } from "@/domain/forum/enterprise/entities/answer";
import {faker} from '@faker-js/faker'

export function makeAnswer(
    overrride : Partial<AnswerProps> = {},
    id?:UniqueId
){
    const question = Answer.create({
        authorId : new UniqueId(),
        questionId : new UniqueId(),
        content : faker.lorem.text.toString(),
        ...overrride,
    }, id)

    return question
}