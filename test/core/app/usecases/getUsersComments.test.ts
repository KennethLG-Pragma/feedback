import { GetUserCommentsUseCase } from '../../../../src/core/app/usecases/getUserComments.usecase'

import {
  userEmail,
  commentsLimit,
  UserCommentsData,
  mockCommentRepository,
  commentDate
} from '../../../mocks/UseCasesMocks/createComment'

const getUserCommentsUseCase = new GetUserCommentsUseCase(mockCommentRepository)

describe('GetUserComments use case', () => {
  test('Should return a user comments  ', async () => {
    mockCommentRepository.getUserComments.mockResolvedValue(UserCommentsData)

    const commentsReturned = await getUserCommentsUseCase.invoke(
      userEmail,
      commentsLimit
    )
    expect(commentsReturned).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          userEmail: userEmail,
          commentDate: expect.any(String)
        })
      ])
    )
  })

  test('Should call getOnlyComment when filter onlyComments is sent', async () => {
    const commentsReturned = await getUserCommentsUseCase.invoke(
      userEmail,
      commentsLimit,
      commentDate,
      { onlyComments: 'true' }
    )

    expect(mockCommentRepository.getOnlyComments).toHaveBeenCalled()
  })
})
