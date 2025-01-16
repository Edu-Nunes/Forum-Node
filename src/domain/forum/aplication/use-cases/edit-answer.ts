import { Answer } from "../../enterprise/entities/answer"
import { AnswersRepository } from "../repositories/answers-repositories"


interface editAnwerUseCaseRequest {
  authorId: string
  answerId : string 
  content : string 
}
interface editAnwerUseCaseResponse {
  answer : Answer
}
  
export class EditAnwerUseCase {
  constructor(private questionRepository: AnswersRepository ) {}
  async execute({
    authorId,
    answerId,
    content,
  }: editAnwerUseCaseRequest ): Promise<editAnwerUseCaseResponse> {
   
    const answer = await this.questionRepository.findById(answerId)
    if(!answer){
        throw new Error('Answer not found.')
    }
    if (authorId !== answer.authorId.toString()){
        throw new Error('Not allowed.')
    }
    answer.content = content
    
    await this.questionRepository.save(answer)
    return {
      answer
    }
  }
}
