import { ZodError } from 'zod'
import { CreateCommentUseCase } from '../../../../src/core/app/usecases/createComment.usecase'
import { CommentEntity } from '../../../../src/core/domain/entities/commentEntity'
import { InvalidDataError } from '../../../../src/core/domain/exceptions/InvalidDataError'
import {
  commentsData,
  mockCommentRepository,
  mockUserImageRepository,
  userEmail
} from '../../../mocks/UseCasesMocks/createComment'
import { mockedUserImages } from '../../../mocks/UseCasesMocks/getUsersByGroupMocks'

const commentUseCase = new CreateCommentUseCase(
  mockCommentRepository,
  mockUserImageRepository
)

describe('CreateComment usecase', () => {
  test('Should return comments with their id generated', async () => {
    mockUserImageRepository.getUserImages.mockImplementation(() => mockedUserImages)

    mockCommentRepository.createComments.mockImplementation(
      (comments: CommentEntity[]) => Promise.resolve(comments)
    )

    const commentsCreated = await commentUseCase.invoke(commentsData, userEmail)
    expect(commentsCreated).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          userEmail: expect.any(String),
          commentDate: expect.any(String)
        })
      ])
    )
  })

  test('Should throws InvalidDataError if comment property and assistance property are not sent', async () => {
    const invalidComments = commentsData.map((comment) => ({
      userEmail: comment.userEmail,
      leaderName: comment.leaderName,
      leaderEmail: comment.leaderEmail,
      event:comment.event,
    }))

    await expect(commentUseCase.invoke(invalidComments, userEmail)).rejects.toThrow(
      InvalidDataError
    )
  })

  test('Should throws InvalidDataError if assistance property is not sent and punctuality property is provided', async () => {
    const invalidComments = commentsData.map((comment) => ({
      userEmail: comment.userEmail,
      leaderName: comment.leaderName,
      leaderEmail: comment.leaderEmail,
      comment: comment.comment,
      event:comment.event,
      punctuality: true
    }))

    await expect(commentUseCase.invoke(invalidComments, userEmail)).rejects.toThrow(
      InvalidDataError
    )
  })
})
