import { GetEventsUseCase } from '../../app/usecases/getEvents.usecase'
import {
  HttpGatewayResponse,
  successResponse
} from '../../../helpers/responses.lambda'
import { errorToResponse } from '../mapper/errorToResponse'
import { Controller } from './interfaces'

export class GetEventsController implements Controller {
  constructor(private readonly getEventsUseCase: GetEventsUseCase) {}

  async handler(): Promise<HttpGatewayResponse> {
    try {
      const events = await this.getEventsUseCase.invoke()

      return successResponse({
        message: 'Ok',
        data: events
      })
    } catch (error) {
      return errorToResponse(error as Error)
    }
  }
}
