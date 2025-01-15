import { UniqueId } from '@/core/entities/unique-id'
import { Answer } from '../../enterprise/entities/answer'

export interface AnswersRepository {
  create(answer: Answer): Promise<void>
  delete(answer: Answer):Promise<void>
  findById(id : string):Promise<Answer|null>
}
