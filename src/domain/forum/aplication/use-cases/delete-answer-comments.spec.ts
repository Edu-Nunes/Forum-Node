import { UniqueId } from "@/core/entities/unique-id";
import { DeleteAnswerCommentUseCase } from "./delete-answer-comments";
import { InMemoryAnswerCommentRepository } from "test/repositories/in-memory-answer-comment-repository";
import { makeAnswerComment } from "test/factories/make-answer-comments";
import { ResourceNotFoundError } from "../../../../core/errors/errors/resource-not-found-error";


let inMemoryAnswerCommentRepository : InMemoryAnswerCommentRepository
let sut : DeleteAnswerCommentUseCase

describe('Delete Answer comment', () => {
    beforeEach( () => {
        inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
        sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentRepository)
    })
    it('Should be able to delete a answer comment', async () => {
            const newAnswerComment = makeAnswerComment(
                {
                    authorId : new UniqueId('author-1')
                },
                new UniqueId('answer-1')
            )
            await inMemoryAnswerCommentRepository.create(newAnswerComment)
            
            await sut.execute({
                answerCommentId : 'answer-1',
                authorId : 'author-1'
            })
            expect(inMemoryAnswerCommentRepository.items).toHaveLength(0)
        })
        it('Should be able to delete user another answer', async () => {
            const newAnswerComment = makeAnswerComment(
                {
                    authorId : new UniqueId('author-1')
                }, 
            )
            await inMemoryAnswerCommentRepository.create(newAnswerComment)
            
            const result = await sut.execute({
                answerCommentId : 'answer-1',
                authorId : 'author-2'
            })
            
            expect(result.isLeft()).toBe(true)
            expect(result.value).toBeInstanceOf(ResourceNotFoundError)    
        })
})