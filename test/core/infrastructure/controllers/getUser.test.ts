import { GetUserController } from '../../../../src/core/insfrastructure/controllers/getUser.controller'
import { GetUserUseCase } from '../../../../src/core/app/usecases/getUser.usecase'
import {
  mockedUser,
  mockedUserImages,
  userImageRepository,
  userRepository
} from '../../../mocks/UseCasesMocks/getUsersByGroupMocks'

const getUserUseCase = new GetUserUseCase(userRepository, userImageRepository)
const getUserController = new GetUserController(getUserUseCase)

describe('getUser controllers tests', () => {
  test('should return a statusCode 200 and user when is succesfull', async () => {
    userRepository.getUserByEmail.mockResolvedValue(mockedUser)
    userImageRepository.getUserImages.mockResolvedValue(mockedUserImages)

    const result = await getUserController.handler({
      user: 'joel.dovale@pragma.com.co'
    })

    expect(result.statusCode).toBe(200)
    expect(JSON.parse(result.body).data.user).toMatchObject({
      ...mockedUser,
      images: mockedUserImages
    })
  })

  test('should return a statusCode 404 when user is not found', async () => {
    userRepository.getUserByEmail.mockResolvedValue(null)

    const result = await getUserController.handler({
      user: 'joel.dovale@pragma.com.co'
    })
    const body = JSON.parse(result.body)
    expect(result.statusCode).toBe(404)
    expect(body.message).toBe('user not found')
    expect(body.data).toBeNull()
  })
})
