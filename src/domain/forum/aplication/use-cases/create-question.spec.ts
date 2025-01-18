import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repositories'
import { CreateQuestionUseCase } from './create-question'
import { UniqueId } from '@/core/entities/unique-id'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachment-repository'


let inMemoryQuestionRepository : InMemoryQuestionRepository
let inMemoryQuestionAttachmentRepository : 
InMemoryQuestionAttachmentsRepository
let sut : CreateQuestionUseCase



describe('Create Question', () => {
  beforeEach( () => {
    inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentsRepository()

    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentRepository
    )
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
  })

  it('Shold be ableto create a question', async () => {
    const result = await sut.execute({
      authorId : '1',
      title : 'Nova Pergunta.',
      content:'conteudo da pergunta',
      attachmentsIds : ['1', '2']
    })

    
    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionRepository.items[0]).toEqual(result.value?.question)
    expect(inMemoryQuestionRepository.items[0].attachment.currentItems).toHaveLength(2)
    expect(inMemoryQuestionRepository.items[0].attachment.currentItems.map(attachment => attachment.attachmentId)).toEqual([
      new UniqueId('1'),
      new UniqueId('2')
    ])

  })
})

