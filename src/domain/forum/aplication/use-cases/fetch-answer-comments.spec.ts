import { FetchAnswerCommentsUseCase } from "./fetch-answer-comments";
import { UniqueId } from "@/core/entities/unique-id";
import { InMemoryAnswerCommentRepository } from "test/repositories/in-memory-answer-comment-repository";
import { makeAnswerComment } from "test/factories/make-answer-comments";

let inMemoryAnswerCommentsRepository : InMemoryAnswerCommentRepository
let sut : FetchAnswerCommentsUseCase

describe('Fetch answer comments', () => {
    beforeEach(() => {
        inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentRepository();
        sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository);
    });

    it('Should be able to fetch answer comments', async () => {
        await inMemoryAnswerCommentsRepository.create(makeAnswerComment({
            answerId: new UniqueId('answer-1')
        }));
        await inMemoryAnswerCommentsRepository.create(makeAnswerComment({
            answerId: new UniqueId('answer-1')
        }));
        await inMemoryAnswerCommentsRepository.create(makeAnswerComment({
            answerId: new UniqueId('answer-1')
        }));

        const result = await sut.execute({
            answerId: new UniqueId('answer-1'),
            page: 1
        });

        expect(result.value?.answerComments).toHaveLength(3);
    });
    it('Should be able to fetch answer comments', async () => {

        for(let i = 1 ; i <= 22 ; i++ ){
            await inMemoryAnswerCommentsRepository.create(makeAnswerComment({
                answerId: new UniqueId('answer-1')
            }));
        }
        
        const result = await sut.execute({
            answerId: new UniqueId('answer-1'),
            page: 2
        });
        expect(result.value?.answerComments).toHaveLength(2);
    });
});
