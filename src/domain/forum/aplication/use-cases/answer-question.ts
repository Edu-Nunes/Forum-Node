import { UniqueId } from '@/core/entities/unique-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repositories'
import { Either, Right } from '@/core/either'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  attachmentIds : string[]
  content: string
}
type AnswerQuestionUseCaseResponse = Either<null,{answer:Answer}>

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
    attachmentIds
  }: AnswerQuestionUseCaseRequest):Promise<AnswerQuestionUseCaseResponse>{
    const answer = Answer.create({
      content,
      authorId: new UniqueId(instructorId),
      questionId: new UniqueId(questionId),
    })

    const answerAttachment = attachmentIds.map(
        (attachmentIds)=>{
            return AnswerAttachment.create({
                attachmentId : new UniqueId(attachmentIds),
                answerId : answer.id
            })
        }
    )

    answer.attachments = new AnswerAttachmentList(answerAttachment)
    await this.answerRepository.create(answer)

    return new Right({
      answer,
    })
  }
}