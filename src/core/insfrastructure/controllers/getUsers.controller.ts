import { GetUsersByGroupUseCase } from '../../app/usecases/getUsersByGroup.usecase'
import {
  HttpGatewayResponse,
  successResponse
} from '../../../helpers/responses.lambda'
import { QueryGetUsersDTO, queryParamsGetUsersSchema } from '../dto/queryGetUsersDTO'
import { Controller } from './interfaces'
import { errorToResponse } from '../mapper/errorToResponse'
import { GetUsersUseCase } from 'src/core/app/usecases/getUsers.usecase'

export class GetUsersController implements Controller {
  constructor(
    private readonly getUserByGroupUsecase: GetUsersByGroupUseCase,
    private readonly getUsersUseCase: GetUsersUseCase
  ) {}

  async handler(request: QueryGetUsersDTO): Promise<HttpGatewayResponse> {
    try {
      queryParamsGetUsersSchema.parse(request ?? {})
      const { group, limit, page, user } = request
      let data = null
      if (group) {
        data = await this.getUserByGroupUsecase.invoke(group, page, limit, user)
      } else {
        data = await this.getUsersUseCase.invoke(page, limit, user)
      }

      return successResponse({
        message: 'ok',
        data
      })
    } catch (error) {
      return errorToResponse(error as Error)
    }
  }
}
