import { CreateCommentController } from '../../../../src/core/insfrastructure/controllers/createComment.controller'
import {
  commentsData,
  userInfoData
} from '../../../mocks/UseCasesMocks/createComment'
import { CreateCommentUseCase } from '../../../../src/core/app/usecases/createComment.usecase'

jest.mock('../../../../src/core/insfrastructure/helpers/getIdTokenPayload', () => ({
  getIdTokenPayload: jest.fn().mockImplementation(() => userInfoData)
}))

const createCommentUseCase = {
  invoke: jest.fn()
}
const createCommentController = new CreateCommentController(
  createCommentUseCase as unknown as CreateCommentUseCase
)

describe('CreateComment controller', () => {
  test('Should return error 400 if request body is invalid', async () => {
    const response = await createCommentController.handler(
      commentsData.map((comment) => ({
        comment: comment.comment
      })),
      'token'
    )

    const data = JSON.parse(response.body)

    expect(response.statusCode).toEqual(400)
    expect(response).toHaveProperty('body')
    expect(data).toHaveProperty('statusCode')
    expect(data).toHaveProperty('message')
    expect(data).toHaveProperty('body')
  })

  test('Should return success if request is correct', async () => {
    createCommentUseCase.invoke.mockResolvedValue(
      commentsData.map((comment) => ({
        commentDate: new Date().getTime().toString(),
        ...comment
      }))
    )
    const response = await createCommentController.handler(
      commentsData.map((comment) => ({
        userEmail: comment.userEmail,
        comment: comment.comment,
        event:comment.event
      })),
      'token'
    )
    const data = JSON.parse(response.body)

    expect(response.statusCode).toEqual(200)
    expect(response).toHaveProperty('body')
    expect(data).toHaveProperty('statusCode')
    expect(data).toHaveProperty('message')
  })
})
