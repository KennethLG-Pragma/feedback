import { mockedResolvedUsers } from '../../../../mocks/UseCasesMocks/getUsersByGroupMocks'

export const SUCCESS_RESPONSE = {
  statusCode: 200,
  body: {
    statusCode: 200,
    message: 'ok',
    data: mockedResolvedUsers
  }
}

export const FAILED_RESPONSE = {
  statusCode: 500,
  body: {
    statusCode: 500,
    message: 'request failed'
  }
}

export const getUserByGroupsUseCaseMocked = {
  invoke: jest.fn()
}
