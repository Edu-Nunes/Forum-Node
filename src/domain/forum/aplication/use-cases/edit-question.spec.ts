import { InMemoryQuestionRepository } from "test/repositories/in-memory-question-repositories";
import { makeQuestion } from "test/factories/make-question";
import { UniqueId } from "@/core/entities/unique-id";
import { EditQuestionUseCase } from "./edit-question";
import { NotAllowedError } from "./errors/resource-not-allowed-error";



let inMemoryQuestionRepository : InMemoryQuestionRepository
let sut : EditQuestionUseCase

describe('Edit Question', () => {
    beforeEach( () => {
        inMemoryQuestionRepository = new InMemoryQuestionRepository()
        sut = new EditQuestionUseCase(inMemoryQuestionRepository)
    })
    it('Should be able to edit a question', async () => {
        const newQuestion = makeQuestion(
            {
                title : 'Titulo1',
                authorId : new UniqueId('author-1'),
                
            },
            new UniqueId('answer-1')
        )
        await inMemoryQuestionRepository.create(newQuestion)
        
        await sut.execute({
            questionId : newQuestion.id.toString(),
            authorId : 'author-1',
            content : 'Conteudo Editado',
            title : 'Titulo editado',
        })
        expect(inMemoryQuestionRepository.items[0]).toMatchObject({
            title : 'Titulo editado',
            content : 'Conteudo Editado'
        })       
    })
    it('Should not be able to edit a question from another user', async () => {
        const newQuestion = makeQuestion(
            {
                authorId: new UniqueId('author-1'),
            },
            new UniqueId('question-1')
        );
        await inMemoryQuestionRepository.create(newQuestion);
        
        
        const result = await sut.execute({
            questionId: newQuestion.id.toString(),
            authorId: 'author-2',  
            content: 'Conteudo Editado',
            title: 'Titulo editado',
        })
        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    });
});