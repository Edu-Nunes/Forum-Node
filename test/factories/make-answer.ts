import { UniqueId } from "@/core/entities/unique-id";
import { Answer, AnswerProps } from "@/domain/forum/enterprise/entities/answer";
import {faker} from '@faker-js/faker'

export function makeAnswer(
    override : Partial<AnswerProps> = {},
    id?:UniqueId
){
    const answer = Answer.create({
        authorId : new UniqueId(),
        questionId : new UniqueId(),
        content : faker.lorem.text().toString(),
        ...override,
    }, id || new UniqueId() )

    return answer
}