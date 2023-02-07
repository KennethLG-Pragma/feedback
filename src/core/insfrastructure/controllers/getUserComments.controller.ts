import { GetUserCommentsDTO, getUserCommentsSchema } from '../dto/GetUserCommentsDTO'
import { errorToResponse } from '../mapper/errorToResponse'
import { GetUserCommentsUseCase } from 'src/core/app/usecases/getUserComments.usecase'
import {
  HttpGatewayResponse,
  successResponse
} from './../../../helpers/responses.lambda'

export class GetUserCommentsController {
  constructor(private readonly getUserCommentsUseCase: GetUserCommentsUseCase) {}

  async handler(request: GetUserCommentsDTO): Promise<HttpGatewayResponse> {
    const { userEmail, limit, commentDatePagination, ...filters } = request
    try {
      getUserCommentsSchema.parse(request ?? {})
      const comments = await this.getUserCommentsUseCase.invoke(
        userEmail,
        Number(limit),
        commentDatePagination,
        filters
      )
      return successResponse({
        message: 'ok',
        data: comments
      })
    } catch (error) {
      return errorToResponse(error as Error)
    }
  }
}
