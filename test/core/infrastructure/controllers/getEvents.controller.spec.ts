import { GetEventsController } from '../../../../src/core/insfrastructure/controllers/getEvents.controller'
import { GetEventsUseCase } from '../../../../src/core/app/usecases/getEvents.usecase'
import { errorMessage, resData } from '../../../mocks/UseCasesMocks/getEventsMocks'

const getEventsUseCase = {
  invoke: jest.fn()
}

const getEventsController = new GetEventsController(
  getEventsUseCase as unknown as GetEventsUseCase
)

describe('Get events Lambda function', () => {
  test('Should return the events correctly', async () => {
    getEventsUseCase.invoke.mockResolvedValue(resData)
    const result = await getEventsController.handler()
    const data = JSON.parse(result.body)

    expect(result.statusCode).toBe(200)
    expect(data.data).toEqual(expect.arrayContaining(resData))
  })

  test('Should return an error if returns null value', async () => {
    getEventsUseCase.invoke.mockImplementation(() => {
      throw new Error(errorMessage)
    })
    const result = await getEventsController.handler()

    expect(result.statusCode).toBe(500)
  })
})
