import { UniqueId } from "@/core/entities/unique-id";
import { AnswerAttachment, 
    AnswerAttachmentProps
 } from "@/domain/forum/enterprise/entities/answer-attachment";



export function makeAnswerAttachments(
    override : Partial<AnswerAttachmentProps> = {},
    id?:UniqueId
){
    const answerattachmentsComment = AnswerAttachment.create({
        answerId : new UniqueId(),
        attachmentId : new UniqueId(),
        ...override
    }, id)

    return answerattachmentsComment
} 