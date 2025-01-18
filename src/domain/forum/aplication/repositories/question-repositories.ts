import { PaginationParams } from "@/domain/forum/enterprise/entities/repositories/pagination-params";
import { Question } from "../../enterprise/entities/question";
import { Slug } from "../../enterprise/entities/value-objects/slug";

export interface QuestionRepository {
  findById(id : string ):Promise< Question|null >
  findBySlug(slug : Slug ):Promise<Question| null >
  create(answer: Question): Promise<void>
  delete(question:Question): Promise<void>
  save(question: Question): Promise<void>
  findManyRecent(params : PaginationParams):Promise<Question[]>
}
