import { GetEventsUseCase } from '../../../../src/core/app/usecases/getEvents.usecase'
import { repository, resData } from '../../../mocks/UseCasesMocks/getEventsMocks'

const getEventsUseCase = new GetEventsUseCase(repository)

describe('Use Case getEvents', () => {
  test('should return a data array', async () => {
    repository.getEvents.mockResolvedValue(resData)
    const result = await getEventsUseCase.invoke()
    expect(result).toEqual(resData)
  })

  test('should throw a error when getEvents method failed', async () => {
    repository.getEvents.mockImplementation(() => {
      throw new Error('error')
    })
    await expect(getEventsUseCase.invoke()).rejects.toThrowError(Error('error'))
  })
})
