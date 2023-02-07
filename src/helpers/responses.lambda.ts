export interface HttpGatewayResponse {
  statusCode: number
  body: string
  headers?: { [header: string]: string | number | boolean }
}

export const successResponse = <T extends object>(body: T): HttpGatewayResponse => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      statusCode: 200,
      ...body
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  }
}

export const badRequest = <T extends object>(body: T): HttpGatewayResponse => {
  return {
    statusCode: 400,
    body: JSON.stringify({
      statusCode: 400,
      ...body
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  }
}

export const notFound = <T extends object>(body: T): HttpGatewayResponse => {
  return {
    statusCode: 404,
    body: JSON.stringify({
      statusCode: 404,
      ...body
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  }
}

export const internalError = <T extends object>(body: T): HttpGatewayResponse => {
  return {
    statusCode: 500,
    body: JSON.stringify({
      statusCode: 500,
      ...body
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  }
}
