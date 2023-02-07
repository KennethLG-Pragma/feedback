import { GetUsersController } from '../../../../src/core/insfrastructure/controllers/getUsers.controller'
import {
  groupMocked,
  mockedUserImages,
  mockedUsers,
  paginationLimit,
  paginationPage,
  userImageRepository,
  userRepository
} from '../../../mocks/UseCasesMocks/getUsersByGroupMocks'
import { FAILED_RESPONSE, SUCCESS_RESPONSE } from './mocks/getUserByGroupMocks'
import { HttpGatewayResponse } from '../../../../src/helpers/responses.lambda'
import { GetUsersByGroupUseCase } from '../../../../src/core/app/usecases/getUsersByGroup.usecase'
import { GetUsersUseCase } from '../../../../src/core/app/usecases/getUsers.usecase'

const getUserByGroupUseCase = new GetUsersByGroupUseCase(
  userRepository,
  userImageRepository
)
const getUsersUseCase = new GetUsersUseCase(userRepository, userImageRepository)
const getUsersByGroupController = new GetUsersController(
  getUserByGroupUseCase,
  getUsersUseCase
)

describe('Controller GetUsers', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('result should return a status 200 and body', async () => {
    userRepository.getUsersByGroup.mockResolvedValue(mockedUsers)
    userImageRepository.getUserImages.mockResolvedValue(mockedUserImages)
    const result = await getUsersByGroupController.handler({
      group: groupMocked,
      page: paginationPage,
      limit: paginationLimit
    })

    const { statusCode, body } = result as HttpGatewayResponse
    expect(statusCode).toBe(200)
    expect(JSON.parse(body)).toMatchObject(SUCCESS_RESPONSE.body)
  })

  test('should called a getUsersByGroup method when a group is send', async () => {
    userRepository.getUsersByGroup.mockResolvedValue(mockedUsers)
    userImageRepository.getUserImages.mockResolvedValue(mockedUserImages)
    const { body, statusCode } = await getUsersByGroupController.handler({
      group: groupMocked,
      page: paginationPage,
      limit: paginationLimit
    })

    expect(userRepository.getUsersByGroup).toHaveBeenCalled()
    expect(statusCode).toBe(200)
    expect(JSON.parse(body)).toMatchObject(SUCCESS_RESPONSE.body)
  })

  test('should called a getUsers method when a group is not send', async () => {
    userRepository.getUsers.mockResolvedValue(mockedUsers)
    userImageRepository.getUserImages.mockResolvedValue(mockedUserImages)
    const { body, statusCode } = await getUsersByGroupController.handler({
      page: paginationPage,
      limit: paginationLimit
    })

    expect(userRepository.getUsers).toHaveBeenCalled()
    expect(statusCode).toBe(200)
    expect(JSON.parse(body)).toMatchObject(SUCCESS_RESPONSE.body)
  })

  test('should return a status 500 when request failed or error was throwed', async () => {
    userRepository.getUsersByGroup.mockResolvedValue(null)
    const result = await getUsersByGroupController.handler({
      group: groupMocked,
      page: paginationPage,
      limit: paginationLimit
    })

    expect(result.statusCode).toBe(500)
    expect(JSON.parse(result.body)).toMatchObject(FAILED_RESPONSE.body)
  })

  test('should return a status 400 when page or limit property are not valid', async () => {
    const result = await getUsersByGroupController.handler({
      group: groupMocked
    } as never)

    expect(result.statusCode).toBe(400)
  })
})
