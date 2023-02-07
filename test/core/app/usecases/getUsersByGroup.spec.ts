import { GetUsersByGroupUseCase } from '../../../../src/core/app/usecases/getUsersByGroup.usecase'
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

const getUsersByGroupUseCase = new GetUsersByGroupUseCase(
  userRepository,
  userImageRepository
)

describe('Use Case getUsersByGroupUseCase', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('should return a array of users', async () => {
    userRepository.getUsersByGroup.mockResolvedValue(mockedUsers)
    userImageRepository.getUserImages.mockResolvedValue(mockedUserImages)
    const result = await getUsersByGroupUseCase.invoke(
      groupMocked,
      paginationPage,
      paginationLimit
    )

    expect(result.users).toEqual(expect.arrayContaining(mockedResolvedUsers.users))
    expect(result.length).toBe(mockedResolvedUsers.length)
    expect(userImageRepository.getUserImages.mock.calls.length).toBe(
      mockedUsers.length
    )
    expect(userRepository.getUsersByGroup.mock.calls.length).toBe(1)
  })

  test("test should throw a error when can't get users", () => {
    userRepository.getUsersByGroup.mockResolvedValue(null)
    async function getUsers() {
      return getUsersByGroupUseCase.invoke(
        groupMocked,
        paginationPage,
        paginationLimit
      )
    }
    expect(getUsers()).rejects.toThrowError(UserRepositoryError)
  })

  test('test should return a array of user with images null', async () => {
    userRepository.getUsersByGroup.mockResolvedValue(mockedUsers)
    userImageRepository.getUserImages.mockResolvedValue(null)
    const result = await getUsersByGroupUseCase.invoke(
      groupMocked,
      paginationPage,
      paginationLimit
    )

    expect(result.users).toEqual(
      expect.arrayContaining(mockedResolvedUsersImageNullable.users)
    )
    expect(result.length).toBe(mockedResolvedUsersImageNullable.length)
    expect(userImageRepository.getUserImages.mock.calls.length).toBe(
      mockedUsers.length
    )
    expect(userRepository.getUsersByGroup.mock.calls.length).toBe(1)
  })
})
