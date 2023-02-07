import { userRepository } from '../../../mocks/UseCasesMocks/getUsersByGroupMocks'
import { GetUserInfoUseCase } from './../../../../src/core/app/usecases/getUserInfo.usecase'
import { UserRepositoryError } from './../../../../src/core/domain/exceptions/userRespositoryError'

const getGroupsUseCase = new GetUserInfoUseCase(userRepository)

describe('Use Case getUserInfo', () => {
  test('Should throw error userRepository if userRepository return null', async () => {
    userRepository.getUserInfo.mockResolvedValue(null)
    await expect(getGroupsUseCase.invoke('test@test.com')).rejects.toThrow(
      UserRepositoryError
    )
    expect(userRepository.getUserInfo).toBeCalled()
  })
})
