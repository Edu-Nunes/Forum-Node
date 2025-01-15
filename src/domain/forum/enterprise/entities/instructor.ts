import { Entity } from '@/core/entities/entities'
import { UniqueId } from '@/core/entities/unique-id'

interface InstructorProps {
  name: string
  id?: UniqueId
}

export class Instructor extends Entity<InstructorProps> {
  static create(props: InstructorProps, id?: UniqueId) {
    const structor = new Instructor({ ...props, id })
    return structor
  }
}
