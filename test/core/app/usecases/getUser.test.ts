import { GetUserUseCase } from '../../../../src/core/app/usecases/getUser.usecase'
import { NotFoundError } from '../../../../src/core/domain/exceptions/NotFoundError'
import {
  mockedUser,
  mockedUserImages,
  userImageRepository,
  userRepository
} from '../../../mocks/UseCasesMocks/getUsersByGroupMocks'

const getUserUseCase = new GetUserUseCase(userRepository, userImageRepository)

describe('getUser usecase test', () => {
  test('should return a user that math with the email', async () => {
    userRepository.getUserByEmail.mockResolvedValue(mockedUser)
    userImageRepository.getUserImages.mockResolvedValue(mockedUserImages)

    const user = await getUserUseCase.invoke('joel.dovale@pragma.com')

    expect(user).toMatchObject({ ...mockedUser, images: mockedUserImages })
    expect(userImageRepository.getUserImages).toBeCalledTimes(1)
  })

  test('should return a notFoundError when user is not found', async () => {
    userRepository.getUserByEmail.mockResolvedValue(null)

    await expect(getUserUseCase.invoke('joel.dovale@pragma.com')).rejects.toThrow(
      NotFoundError
    )
  })
})
