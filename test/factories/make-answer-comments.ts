import { UniqueId } from "@/core/entities/unique-id";
import { AnswerComment, AnswerCommentProps } from "@/domain/forum/enterprise/entities/answer-comment";


import {faker} from '@faker-js/faker'

export function makeAnswerComment(
    override : Partial<AnswerCommentProps> = {},
    id?:UniqueId
){
    const answerComment = AnswerComment.create({
        authorId : new UniqueId(),
        answerId: new UniqueId(),
        content : faker.lorem.text(),
        ...override
    }, id)

    return answerComment
}