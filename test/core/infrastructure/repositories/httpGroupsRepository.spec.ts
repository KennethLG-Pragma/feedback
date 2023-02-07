import axios, { AxiosError } from 'axios'
import {
  errorRes,
  resData,
  unauthorizedMessage
} from '../../../mocks/UseCasesMocks/GetGroupMocks'
import { HttpGroupRepository } from '../../../../src/core/insfrastructure/repositories/httpGroupRepository'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const httpGroupRepository = new HttpGroupRepository()

describe('HttpGroupRepository  getGroups Tests', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
  })

  test('should return a array of groups when request is succesfull', async () => {
    mockedAxios.post.mockResolvedValue({ status: 200, data: resData })
    const groups = await httpGroupRepository.getGroups()
    expect(groups).toEqual(resData.data)
  })

  test('should throw a error when request failed', async () => {
    mockedAxios.post.mockRejectedValue(() => {
      throw new AxiosError()
    })
    await expect(httpGroupRepository.getGroups()).rejects.toThrowError(AxiosError)
  })

  test('should throw a error when appscript status is not 200', async () => {
    mockedAxios.post.mockResolvedValue(errorRes)
    await expect(httpGroupRepository.getGroups()).rejects.toThrowError(
      Error(unauthorizedMessage)
    )
  })
})
