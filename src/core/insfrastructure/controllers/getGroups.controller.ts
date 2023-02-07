import { GetGroupsUseCase } from '../../app/usecases/getGroups.usecase'
import { Controller } from './interfaces'
import {
  HttpGatewayResponse,
  successResponse
} from '../../../helpers/responses.lambda'
import { errorToResponse } from '../mapper/errorToResponse'

export class GetGroupsController implements Controller {
  constructor(private readonly getGroupsUseCase: GetGroupsUseCase) {}
  async handler(): Promise<HttpGatewayResponse> {
    try {
      const result = await this.getGroupsUseCase.invoke()

      return successResponse({
        message: 'Ok',
        data: result
      })
    } catch (error) {
      return errorToResponse(error as Error)
    }
  }
}
