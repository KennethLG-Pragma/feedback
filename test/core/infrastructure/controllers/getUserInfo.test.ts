import { GetUserInfoController } from './../../../../src/core/insfrastructure/controllers/getUserInfo.controller'
import { UserRepositoryError } from './../../../../src/core/domain/exceptions/userRespositoryError'
import { userInfoData } from '../../../mocks/UseCasesMocks/createComment'
import { GetUserInfoUseCase } from './../../../../src/core/app/usecases/getUserInfo.usecase'

jest.mock('../../../../src/core/insfrastructure/helpers/getIdTokenPayload', () => ({
  getIdTokenPayload: jest.fn().mockImplementation(() => userInfoData)
}))

const getUserInfoUseCase = {
  invoke: jest.fn()
}

const getUserInfoController = new GetUserInfoController(
  getUserInfoUseCase as unknown as GetUserInfoUseCase
)

describe('GetUserInfo controller', () => {
  test('Should return status 500 if getUserInfo usecase throws an error', async () => {
    getUserInfoUseCase.invoke.mockRejectedValue(
      new UserRepositoryError('Request to get user info failed')
    )
    const response = await getUserInfoController.handler('token')
    const data = JSON.parse(response.body)

    expect(response.statusCode).toBe(500)
    expect(data).toHaveProperty('message')
  })
})
