import { UniqueId } from "@/core/entities/unique-id";
import { QuestionComment, QuestionCommentProps } from "@/domain/forum/enterprise/entities/question-coment";

import {faker} from '@faker-js/faker'

export function makeQuestionComment(
    override : Partial<QuestionCommentProps> = {},
    id?:UniqueId
){
    const questionComment = QuestionComment.create({
        authorId : new UniqueId(),
        questionId: new UniqueId(),
        content : faker.lorem.text(),
        ...override
    }, id)

    return questionComment
}