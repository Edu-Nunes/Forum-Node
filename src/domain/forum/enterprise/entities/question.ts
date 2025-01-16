import { Slug } from './value-objects/slug'
import { Entity } from '@/core/entities/entities'
import { UniqueId } from '@/core/entities/unique-id'
import { Optional } from '@/core/types/optional'

export interface QuestionProps {
  authorId: UniqueId
  bestAnswerId?: UniqueId
  title: string
  content: string
  slug: Slug
  createdAt: Date
  updatedAt?: Date
}
export class Question extends Entity<QuestionProps> {
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
    props: Optional<QuestionProps, 'createdAt' | 'slug'>,
    id?: UniqueId,
  ) {
    const question = new Question(
      {
        slug: props.slug ?? Slug.createFromText(props.title),
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return question
  }
}
