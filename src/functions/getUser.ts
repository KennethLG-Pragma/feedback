import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { GetUserUseCase } from 'src/core/app/usecases/getUser.usecase'
import { GetUserController } from 'src/core/insfrastructure/controllers/getUser.controller'
import { HttpUserImageRepository } from 'src/core/insfrastructure/repositories/httpUserImageRepository'
import { HttpUserRepository } from 'src/core/insfrastructure/repositories/httpUserRepository'

const getUserController = new GetUserController(
  new GetUserUseCase(new HttpUserRepository(), new HttpUserImageRepository())
)

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { pathParameters } = event
  const response = await getUserController.handler(
    pathParameters as { user: string }
  )
  return response
}
