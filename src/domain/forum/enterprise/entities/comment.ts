import { Entity } from '@/core/entities/entities'
import { UniqueId } from '@/core/entities/unique-id'

export interface CommentProps {
  authorId: UniqueId
  content: string
  createdAt: Date
  updatedAt?: Date
}
export abstract class Comment<Props extends CommentProps> extends Entity<Props> {
  get authorId(): string {
    return this.props.authorId.toString()
  }
  get content(): string {
    return this.props.content.toString()
  }
  get createdAt(): string {
    return this.props.createdAt.toString()
  }
  get updatedAt(): Date | undefined {
    return this.props.updatedAt
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
}
