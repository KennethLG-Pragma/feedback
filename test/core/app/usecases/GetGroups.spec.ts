import { GetGroupsUseCase } from '../../../../src/core/app/usecases/getGroups.usecase'

import {
  repository,
  data,
  unauthorizedMessage
} from '../../../mocks/UseCasesMocks/GetGroupMocks'

const getGroupsUseCase = new GetGroupsUseCase(repository)

describe('Use Case getGroups', () => {
  test('should return a data array', async () => {
    repository.getGroups.mockResolvedValue(data)

    const result = await getGroupsUseCase.invoke()
    expect(result).toEqual(expect.arrayContaining(data))
  })

  test('should throw a error when getGroups method failed', async () => {
    repository.getGroups.mockImplementation(() => {
      throw new Error(unauthorizedMessage)
    })

    await expect(getGroupsUseCase.invoke()).rejects.toThrowError(
      Error(unauthorizedMessage)
    )
  })
})
