import {
  badRequest,
  HttpGatewayResponse,
  internalError,
  notFound
} from '../../../helpers/responses.lambda'
import { ZodError } from 'zod'
import { InvalidDataError } from '../../domain/exceptions/InvalidDataError'
import { NotFoundError } from '../../domain/exceptions/NotFoundError'

export const errorToResponse = (error: Error): HttpGatewayResponse => {
  if (error instanceof ZodError) {
    return badRequest({
      message: 'error',
      body: error.issues.map((issue) => {
        return {
          code: issue.code,
          message: issue.message,
          property: issue.path.length > 1 ? issue.path[1] : issue.path[0]
        }
      })
    })
  }

  if (error instanceof InvalidDataError) {
    return badRequest({
      message: 'error',
      body: error.message
    })
  }

  if (error instanceof NotFoundError) {
    return notFound({
      message: error.message,
      data: null
    })
  }

  return internalError({
    message: 'request failed'
  })
}
