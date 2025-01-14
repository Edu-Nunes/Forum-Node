import { UniqueId } from "../../core/entities/unique-id"
import { Answer } from "../entities/answer"
import {AnswersRepository} from "../repositories/answers-repositories"


interface AnswerQuestionUseCaseRequest{
    instructorId : string
    questionId : string
    content : string 
    
}

export class AnswerQuestionUseCase{
    constructor(
        private answerRepository : AnswersRepository,
    ){}



    async execute({ instructorId, questionId , content }: AnswerQuestionUseCaseRequest ) {

        const answer = Answer.create({
            content,
            authorId : new UniqueId(instructorId),
            questionId : new UniqueId(questionId)

        });

        await this.answerRepository.create(answer)

        return  answer
    }
}