import { UniqueId } from '@/core/entities/unique-id'
import { Optional } from '@/core/types/optional'
import { AnswerAttachmentList } from './answer-attachment-list'
import { AggregateRoot } from '@/core/entities/agregate-root'
import { AnswerCreatedEvent } from '../events/answer-created-event'

export interface AnswerProps {
  authorId: UniqueId
  questionId: UniqueId
  content: string
  attachments : AnswerAttachmentList
  createdAt: Date
  updateAt?: Date
}
export class Answer extends AggregateRoot<AnswerProps> {
  get authorId(): string {
    return this.props.authorId.toString()
  }

  get questionId(): string {
    return this.props.questionId.toString()
  }
  get attachments(){
    return this.props.attachments
  }

  get content(): string {
    return this.props.content.toString()
  }

  get createdAt(): string {
    return this.props.createdAt.toString()
  }

  get updateAt(): Date | undefined {
    return this.props.updateAt
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updateAt = new Date()
  }

  set content(content: string) {
    this.touch()
    this.props.content = content
  }

  set attachments(attachment: AnswerAttachmentList) {
    this.props.attachments = attachment
    this.touch()
  }

  static create(props: Optional<AnswerProps, 'createdAt' | 'attachments' >, id?: UniqueId) {
    const answer = new Answer(
      {
        ...props,
        attachments : props.attachments ?? new AnswerAttachmentList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    const isNewAnswer = !id
    if(isNewAnswer){
      answer.addDomainEvent( new AnswerCreatedEvent(answer))
    }
    return answer
  }
}
