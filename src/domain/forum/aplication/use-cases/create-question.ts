
import { UniqueId } from '@/core/entities/unique-id';
import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/question-repositories';
import { Either, right } from '@/core/either';
import { QuestionAttachment } from '../../enterprise/entities/question-attachment';
import { QuestionAttachmentList } from '@/domain/forum/enterprise/entities/question-attachment-list';

interface CreateQuestionUseCaseRequest {
  authorId : string 
  title : string 
  content : string
  attachmentsIds : string[]
}
type CreateQuestionUseCaseResponse = Either< null ,{
  question : Question
}>

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}
  async execute({
    authorId ,
    title ,
    content,
    attachmentsIds,
  }: CreateQuestionUseCaseRequest ): Promise<CreateQuestionUseCaseResponse> {
    const question  = Question.create({
      authorId: new UniqueId(authorId),
      title,
      content,
    })
    const questionAttachemnts = attachmentsIds.map( attachmentId => {
      return QuestionAttachment.create({
        attachmentId : new UniqueId(attachmentId),
        questionId : question.id
      })
    })
    question.attachment = new QuestionAttachmentList(questionAttachemnts)

    await this.questionRepository.create(question)
    return right({question : question})
  }
}
