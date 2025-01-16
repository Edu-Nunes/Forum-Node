import { QuestionComment } from "../../enterprise/entities/question-coment";

export interface QuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>
  findById(id: string): Promise< QuestionComment |void >
  delete(questionComment: QuestionComment): Promise<void>
  
}
