import { Either, left, right } from '@/core/either';
import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/question-repositories';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { NotAllowedError } from './errors/resource-not-allowed-error';
import { QuestionAttachment } from '../../enterprise/entities/question-attachment';
import { QuestionAttachmentsRepository } from '../repositories/question-attachment-repositorie';
import { QuestionAttachmentList } from '@/domain/forum/enterprise/entities/question-attachment-list';
import { UniqueId } from '@/core/entities/unique-id';

interface editQuestionUseCaseRequest {
  authorId: string
  title : string
  attachmentsIds : string[]
  questionId : string 
  content : string 
}
type editQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError ,{
  question : Question
}>
  
export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository,
    private questionAttachmentsRepository:QuestionAttachmentsRepository,
   ) {}
  async execute({
    authorId,
    attachmentsIds,
    questionId,
    content,
    title

  }: editQuestionUseCaseRequest ): Promise<editQuestionUseCaseResponse> {
   
    const question = await this.questionRepository.findById(questionId)
    if(!question){
        return left(new ResourceNotFoundError())
    }
    if (authorId !== question.authorId.toString()){
        return left( new NotAllowedError() )
    }
    const currentQuestionAttachment = await this.questionAttachmentsRepository.findManyByQuestionId(questionId)

    const questionAttachmentList = new QuestionAttachmentList(currentQuestionAttachment)

    const questionAttachemnts = attachmentsIds.map( attachmentId => {
          return QuestionAttachment.create({
            attachmentId : new UniqueId(attachmentId),
            questionId : question.id
          })
        }
    )
    questionAttachmentList.update(questionAttachemnts)
    question.attachment = questionAttachmentList 
    
    question.title = title
    question.content = content
    

    await this.questionRepository.save(question)
    return right({
      question
    })
  }
}
