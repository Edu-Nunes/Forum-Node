import { UniqueId } from "@/core/entities/unique-id";
import { QuestionAttachment, 
    QuestionAttachmentProps
 } from "@/domain/forum/enterprise/entities/question-attachment";



export function makeQuestionAttachments(
    override : Partial<QuestionAttachmentProps> = {},
    id?:UniqueId
){
    const questionattachmentsComment = QuestionAttachment.create({
        questionId : new UniqueId(),
        attachmentId : new UniqueId(),
        ...override
    }, id)

    return questionattachmentsComment
} 