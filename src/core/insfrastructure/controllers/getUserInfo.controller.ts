import { GetUserInfoUseCase } from 'src/core/app/usecases/getUserInfo.usecase'
import {
  HttpGatewayResponse,
  successResponse
} from './../../../helpers/responses.lambda'
import { getIdTokenPayload } from '../helpers/getIdTokenPayload'
import { errorToResponse } from '../mapper/errorToResponse'
import { Controller } from './interfaces'

export class GetUserInfoController implements Controller {
  constructor(private readonly getUserInfoUseCase: GetUserInfoUseCase) {}
  async handler(token: string): Promise<HttpGatewayResponse> {
    try {
      const userPayload = getIdTokenPayload(token)
      const userInfo = await this.getUserInfoUseCase.invoke(userPayload.email)
      return successResponse({
        message: 'ok',
        data: userInfo
      })
    } catch (error) {
      return errorToResponse(error as Error)
    }
  }
}
