import { GetUsersByGroupUseCase } from '../../../../src/core/app/usecases/getUsersByGroup.usecase'
import { GetUsersUseCase } from '../../../../src/core/app/usecases/getUsers.usecase'
import { UserRepositoryError } from '../../../../src/core/domain/exceptions/userRespositoryError'
import {
  groupMocked,
  mockedResolvedUsers,
  mockedResolvedUsersImageNullable,
  mockedUserImages,
  mockedUsers,
  paginationLimit,
  paginationPage,
  userImageRepository,
  userRepository
} from '../../../mocks/UseCasesMocks/getUsersByGroupMocks'

const getUsersUseCase = new GetUsersUseCase(userRepository, userImageRepository)

describe('Use Case getUsersUseCase', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('should return a array of users', async () => {
    userRepository.getUsers.mockResolvedValue(mockedUsers)
    userImageRepository.getUserImages.mockResolvedValue(mockedUserImages)
    const result = await getUsersUseCase.invoke(paginationPage, paginationLimit)

    expect(result.users).toEqual(expect.arrayContaining(mockedResolvedUsers.users))
    expect(result.length).toBe(mockedResolvedUsers.length)
    expect(userImageRepository.getUserImages.mock.calls.length).toBe(
      mockedUsers.length
    )
    expect(userRepository.getUsers).toBeCalled()
  })

  test("test should throw a error when can't get users", () => {
    userRepository.getUsers.mockResolvedValue(null)
    async function getUsers() {
      return getUsersUseCase.invoke(paginationPage, paginationLimit)
    }
    expect(getUsers()).rejects.toThrowError(UserRepositoryError)
  })

  test('test should return a array of user with images null', async () => {
    userRepository.getUsers.mockResolvedValue(mockedUsers)
    userImageRepository.getUserImages.mockResolvedValue(null)
    const result = await getUsersUseCase.invoke(
      groupMocked,
      paginationPage,
      paginationLimit
    )

    expect(result.users).toEqual(
      expect.arrayContaining(mockedResolvedUsersImageNullable.users)
    )
    expect(result.length).toBe(mockedResolvedUsersImageNullable.length)
    expect(userImageRepository.getUserImages).toBeCalledTimes(mockedUsers.length)
    expect(userRepository.getUsers).toBeCalled()
  })
})
