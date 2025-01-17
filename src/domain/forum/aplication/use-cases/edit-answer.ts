import { Either, left, right } from "@/core/either"
import { Answer } from "../../enterprise/entities/answer"
import { AnswersRepository } from "../repositories/answers-repositories"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { NotAllowedError } from "./errors/resource-not-allowed-error"


interface editAnwerUseCaseRequest {
  authorId: string
  answerId : string 
  content : string 
}
type editAnwerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError,{
  answer : Answer
}>
  
export class EditAnwerUseCase {
  constructor(private questionRepository: AnswersRepository ) {}
  async execute({
    authorId,
    answerId,
    content,
  }: editAnwerUseCaseRequest ): Promise<editAnwerUseCaseResponse> {
   
    const answer = await this.questionRepository.findById(answerId)
    if(!answer){
        return left(new ResourceNotFoundError())
    }
    if (authorId !== answer.authorId.toString()){
        return left(new NotAllowedError())
    }
    answer.content = content
    
    await this.questionRepository.save(answer)
    return right({
      answer
    })
  }
}
