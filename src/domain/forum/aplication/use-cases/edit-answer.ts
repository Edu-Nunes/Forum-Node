import { Either, left, right } from "@/core/either"
import { Answer } from "../../enterprise/entities/answer"
import { AnswersRepository } from "../repositories/answers-repositories"
import { ResourceNotFoundError } from "../../../../core/errors/errors/resource-not-found-error"
import { NotAllowedError } from "../../../../core/errors/errors/resource-not-allowed-error"
import { AnswerAttachment } from "../../enterprise/entities/answer-attachment"
import { AnswerAttachmentsRepository } from "../repositories/answer-attachment-repository"
import { UniqueId } from "@/core/entities/unique-id"
import { AnswerAttachmentList } from "../../enterprise/entities/answer-attachment-list"


interface editAnwerUseCaseRequest {
  authorId: string
  answerId : string 
  content : string 
  attachmentIds : string[]
}
type editAnwerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError,{
  answer : Answer
}>
  
export class EditAnwerUseCase {
  constructor(private questionRepository: AnswersRepository ,
    private answerAtachmentRepository : AnswerAttachmentsRepository
  ) {}
  async execute({
    authorId,
    answerId,
    content,
    attachmentIds,
  }: editAnwerUseCaseRequest ): Promise<editAnwerUseCaseResponse> {
   
    const answer = await this.questionRepository.findById(answerId)
    if(!answer){
        return left(new ResourceNotFoundError())
    }
    if (authorId !== answer.authorId.toString()){
        return left(new NotAllowedError())
    }
    const currentAnswerAttachments = 
    await this.answerAtachmentRepository.findManyByAnswerId(answerId)

    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments,
    )

    const answerAttachments = attachmentIds.map( (attachmentId ) => {
      return AnswerAttachment.create({
        attachmentId : new UniqueId(attachmentId),
        answerId : answer.id
      })
    } )

    answerAttachmentList.update(answerAttachments)

    answer.attachments = answerAttachmentList
    answer.content = content
    
    await this.questionRepository.save(answer)
    return right({
      answer
    })
  }
}
