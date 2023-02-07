import { z } from 'zod'
import { CreateCommentUseCase } from './../../app/usecases/createComment.usecase'
import { PostCommentDTO, postCommentSchema } from '../dto/PostCommentDTO'
import { errorToResponse } from '../mapper/errorToResponse'
import {
  HttpGatewayResponse,
  successResponse
} from './../../../helpers/responses.lambda'
import errorMessages from '../utils/errorMessages'
import { getIdTokenPayload } from '../helpers/getIdTokenPayload'

export class CreateCommentController {
  constructor(private readonly createCommentUseCase: CreateCommentUseCase) {}

  async handler(request: object[], token: string): Promise<HttpGatewayResponse> {
    try {
      const leaderInfo = getIdTokenPayload(token)
      const comments = request.map((commentData) => ({
        ...commentData,
        leaderName: `${leaderInfo.given_name} ${leaderInfo.family_name}`,
        leaderEmail: leaderInfo.email
      }))
      z.array(postCommentSchema)
        .min(1, {
          message: errorMessages.AT_LEAST_A_COMMENT
        })
        .parse(comments)
      await this.createCommentUseCase.invoke(
        comments as PostCommentDTO[],
        leaderInfo.email
      )
      return successResponse({
        message: 'ok'
      })
    } catch (error) {
      console.log(error)
      return errorToResponse(error as Error)
    }
  }
}
