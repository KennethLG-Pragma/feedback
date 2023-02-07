import { GetGroupsController } from '../../../../src/core/insfrastructure/controllers/getGroups.controller'
import { resData, errorMessage } from '../../../mocks/LambdaMocks/GetGroupsMocks'
import { GetGroupsUseCase } from '../../../../src/core/app/usecases/getGroups.usecase'

const getGroupsUseCase = {
  invoke: jest.fn()
}

const getGroupsController = new GetGroupsController(
  getGroupsUseCase as unknown as GetGroupsUseCase
)

describe('Get groups lambda function', () => {
  test('should return a statusCode 200 and array data', async () => {
    getGroupsUseCase.invoke.mockResolvedValue(resData)
    const result = await getGroupsController.handler()
    const data = JSON.parse(result.body)

    expect(result.statusCode).toBe(200)
    expect(data.data).toEqual(expect.arrayContaining(resData))
  })
})

describe('Get error authorization lambda function', () => {
  test('should return a statusCode 500, unauthorized message and data is null', async () => {
    getGroupsUseCase.invoke.mockImplementation(() => {
      throw new Error(errorMessage)
    })
    const result = await getGroupsController.handler()
    expect(result.statusCode).toBe(500)
  })
})
