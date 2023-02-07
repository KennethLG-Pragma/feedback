import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { GetUsersUseCase } from 'src/core/app/usecases/getUsers.usecase'
import { GetUsersByGroupUseCase } from 'src/core/app/usecases/getUsersByGroup.usecase'
import { GetUsersController } from 'src/core/insfrastructure/controllers/getUsers.controller'
import { HttpUserImageRepository } from 'src/core/insfrastructure/repositories/httpUserImageRepository'
import { HttpUserRepository } from 'src/core/insfrastructure/repositories/httpUserRepository'

interface QueryParams {
  group?: string
  user?: string
  page: string
  limit: string
}

const userRepository = new HttpUserRepository()
const userImageRepository = new HttpUserImageRepository()

const getUsersController = new GetUsersController(
  new GetUsersByGroupUseCase(userRepository, userImageRepository),
  new GetUsersUseCase(userRepository, userImageRepository)
)

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const params = event.queryStringParameters as unknown as QueryParams
  const result = await getUsersController.handler(params)
  return result
}
