import { UniqueId } from "@/core/entities/unique-id";
import { DeleteQuestionCommentUseCase } from "./delete-question-comment";
import { InMemoryQuestionCommentRepository } from "test/repositories/in-memory-question-comments";
import { makeQuestionComment } from "test/factories/make-question-comments";



let inMemoryQuestionCommentRepository : InMemoryQuestionCommentRepository
let sut : DeleteQuestionCommentUseCase

describe('Delete Question comment', () => {
    beforeEach( () => {
        inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
        sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentRepository)
    })
    it('Should be able to delete a question comment', async () => {
            const newQuestionComment = makeQuestionComment(
                {
                    authorId : new UniqueId('author-1')
                },
                new UniqueId('answer-1')
            )
            await inMemoryQuestionCommentRepository.create(newQuestionComment)
            
            await sut.execute({
                questionCommentId : 'answer-1',
                authorId : 'author-1'
            })
            expect(inMemoryQuestionCommentRepository.items).toHaveLength(0)
        })
        it('Should be able to delete user another question', async () => {
            const newQuestionComment = makeQuestionComment(
                {
                    authorId : new UniqueId('author-1')
                }, 
            )
            await inMemoryQuestionCommentRepository.create(newQuestionComment)
            
            
            expect( () => {
                return sut.execute({
                    questionCommentId : 'answer-1',
                    authorId : 'author-2'
                })
            }).rejects.toBeInstanceOf(Error)
        })
})