import { UniqueId } from '@/core/entities/unique-id'
import { Answer } from '../../enterprise/entities/answer'
import { PaginationParams } from '@/core/repositories/pagination-params'

export interface AnswersRepository {
  create(answer: Answer): Promise<void>
  delete(answer: Answer):Promise<void>
  findById(id : string):Promise<Answer|null>
  save(answer : Answer):Promise<void>
  findManyByQuestionId(questionId : UniqueId , params : PaginationParams):Promise<Answer[]>
}
