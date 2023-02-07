import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { GetUserInfoUseCase } from 'src/core/app/usecases/getUserInfo.usecase'
import { GetUserInfoController } from 'src/core/insfrastructure/controllers/getUserInfo.controller'
import { HttpUserRepository } from 'src/core/insfrastructure/repositories/httpUserRepository'

const getUserInfoController = new GetUserInfoController(
  new GetUserInfoUseCase(new HttpUserRepository())
)
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { headers } = event
  const data = await getUserInfoController.handler(headers.Authorization as string)
  return data as APIGatewayProxyResult
}
