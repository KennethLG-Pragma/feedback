import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { HttpGroupRepository } from 'src/core/insfrastructure/repositories/httpGroupRepository'
import { GetGroupsUseCase } from '../core/app/usecases/getGroups.usecase'
import { GetGroupsController } from '../core/insfrastructure/controllers/getGroups.controller'

const getGroupsController = new GetGroupsController(
  new GetGroupsUseCase(new HttpGroupRepository())
)
export const handler = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const data = await getGroupsController.handler()
  return data as APIGatewayProxyResult
}
