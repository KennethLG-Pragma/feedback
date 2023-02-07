import { GetUserUseCase } from '../../app/usecases/getUser.usecase'
import { HttpGatewayResponse, successResponse } from '../../../helpers/responses.lambda'
import { getUserPathParams, UserPathParams } from '../dto/getUserDto'
import { errorToResponse } from '../mapper/errorToResponse'
import { Controller } from './interfaces'

export class GetUserController implements Controller {
  constructor(private readonly getUserUseCase: GetUserUseCase) {}

  async handler(request: UserPathParams): Promise<HttpGatewayResponse> {
    try {
      getUserPathParams.parse(request ?? {})
      const { user } = request
      const result = await this.getUserUseCase.invoke(user)
      return successResponse({
        message: 'user obtained',
        data: {
          user: result
        }
      })
    } catch (error) {
      return errorToResponse(error as Error)
    }
  }
}
