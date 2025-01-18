import { AggregateRoot } from '@/core/entities/agregate-root'
import { Slug } from './value-objects/slug'
import { UniqueId } from '@/core/entities/unique-id'
import { Optional } from '@/core/types/optional'
import { QuestionAttachment } from './question-attachment'
import { QuestionAttachmentList } from '@/domain/forum/enterprise/entities/question-attachment-list'

export interface QuestionProps {
  authorId: UniqueId
  attachments : QuestionAttachmentList
  bestAnswerId?: UniqueId
  title: string
  content: string
  slug: Slug
  createdAt: Date
  updatedAt?: Date
}
export class Question extends AggregateRoot<QuestionProps> {
  get authorId(): string {
    return this.props.authorId.toString()
  }

  get bestAnswerId(): string | undefined {
    return this.props.bestAnswerId?.toString()
  }

  get title(): string {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)

    this.touch()
  }

  get bestWenserId(): string | undefined {
    const wenser = this.bestAnswerId
    if (!wenser) {
      return undefined
    }
    return wenser
  }

  set bestWenserId(bestAnswerId: UniqueId) {
    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }

  get content(): string {
    return this.props.content
  }

  get slug(): Slug {
    return this.props.slug
  }

  get attachment(){
    return this.props.attachments
  }
  set attachment(attachments : QuestionAttachmentList){
    this.props.attachments = attachments
  }

  get createdAt(): string {
    return this.props.createdAt.toString()
  }

  get updateAt(): string {
    return this.props.updatedAt!.toString()
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.touch()
    this.props.content = content
  }

  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug' |'attachments' >,
    id?: UniqueId,
  ) {
    const question = new Question(
      {
        ...props,

        slug: props.slug ?? Slug.createFromText(props.title),
        attachments : props.attachments ?? new QuestionAttachmentList(),
        createdAt: props.createdAt ?? new Date(),

      },
      id,
    )
    return question
  }
}
