import { UniqueId } from "@/core/entities/unique-id";
import { Question, QuestionProps } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";
import {faker} from '@faker-js/faker'

export function makeQuestion(
    overrride : Partial<QuestionProps> = {},
    id?:UniqueId
){
    const question = Question.create({
        authorId : new UniqueId(),
        content : faker.lorem.text.toString(),
        slug:Slug.createFromText('Example-Question'),
        title: faker.lorem.sentence.toString() ,
        ...overrride,
    }, id)

    return question
}