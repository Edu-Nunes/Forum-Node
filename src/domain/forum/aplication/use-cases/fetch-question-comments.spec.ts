import { FetchQuestionCommentsUseCase } from "./fecth-question-comments";
import { UniqueId } from "@/core/entities/unique-id";
import { InMemoryQuestionCommentRepository } from "test/repositories/in-memory-question-comments";
import { makeQuestionComment } from "test/factories/make-question-comments";


let inMemoryQuestionCommentsRepository : InMemoryQuestionCommentRepository
let sut : FetchQuestionCommentsUseCase

describe('Fetch question comments', () => {
    beforeEach(() => {
        inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentRepository();
        sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository);
    });

    it('Should be able to fetch question comments', async () => {
        await inMemoryQuestionCommentsRepository.create(makeQuestionComment({
            questionId: new UniqueId('question-1')
        }));
        await inMemoryQuestionCommentsRepository.create(makeQuestionComment({
            questionId: new UniqueId('question-1')
        }));
        await inMemoryQuestionCommentsRepository.create(makeQuestionComment({
            questionId: new UniqueId('question-1')
        }));

        const result = await sut.execute({
            questionId: new UniqueId('question-1'),
            page: 1
        }); 
        expect(result.value?.questionComments).toHaveLength(3);
    });
    it('Should be able to fetch question comments', async () => {

        for(let i = 1 ; i <= 22 ; i++ ){
            await inMemoryQuestionCommentsRepository.create(makeQuestionComment({
                questionId: new UniqueId('question-1')
            }));
        }
        
        const result = await sut.execute({
            questionId: new UniqueId('question-1'),
            page: 2
        });
        expect(result.value?.questionComments).toHaveLength(2);
    });
});
