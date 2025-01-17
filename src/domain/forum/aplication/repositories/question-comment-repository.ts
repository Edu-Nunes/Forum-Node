import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionComment } from "../../enterprise/entities/question-coment";
import { UniqueId } from "@/core/entities/unique-id";

export interface QuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>
  findById(id: string): Promise< QuestionComment |void >
  delete(questionComment: QuestionComment): Promise<void>
  findManyByQuestionId(
    questionId: UniqueId,
    params : PaginationParams
  ):Promise<QuestionComment[]>
}
