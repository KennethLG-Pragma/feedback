// UseCases mock data

export const errorRequestMessage = 'could not send a request'
export const unauthorizedMessage = 'No Autorizado'

export const data = [{ group: 'proyecto' }, { group: 'gryffindor' }]

export const resData = {
  status: 200,
  data: { data: data, typeRequest: 'GROUPS', status: 200 }
}
export const errorRes = {
  status: 200,
  data: { error: 'No Autorizado', status: 401 }
}

export const repository = {
  getGroups: jest.fn()
}
