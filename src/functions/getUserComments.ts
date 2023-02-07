import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { GetUserCommentsUseCase } from 'src/core/app/usecases/getUserComments.usecase'
import { GetUserCommentsController } from 'src/core/insfrastructure/controllers/getUserComments.controller'
import { DynamoCommentRepository } from 'src/core/insfrastructure/repositories/dynamoCommentRepository'

interface QueryParams {
  userEmail: string
  limit: string
  onlyComments?: string
  commentDatePagination?: string
}

const getUserCommentsController = new GetUserCommentsController(
  new GetUserCommentsUseCase(new DynamoCommentRepository())
)

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const response = await getUserCommentsController.handler(
    event.queryStringParameters as unknown as QueryParams
  )
  return response
}
