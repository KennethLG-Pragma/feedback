import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { CreateCommentUseCase } from 'src/core/app/usecases/createComment.usecase'
import { CreateCommentController } from 'src/core/insfrastructure/controllers/createComment.controller'
import { DynamoCommentRepository } from 'src/core/insfrastructure/repositories/dynamoCommentRepository'
import { HttpUserImageRepository } from 'src/core/insfrastructure/repositories/httpUserImageRepository'

const createCommentController = new CreateCommentController(
  new CreateCommentUseCase(
    new DynamoCommentRepository(),
    new HttpUserImageRepository()
  )
)

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { body, headers } = event
  const commentsData = JSON.parse(body as string) as object[]
  const response = await createCommentController.handler(
    commentsData,
    headers.Authorization as string
  )
  return response
}
