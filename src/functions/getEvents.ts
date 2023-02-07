import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { GetEventsUseCase } from 'src/core/app/usecases/getEvents.usecase'
import { GetEventsController } from 'src/core/insfrastructure/controllers/getEvents.controller'
import { HttpEventRepository } from 'src/core/insfrastructure/repositories/httpEventRepository'

const getEventsController = new GetEventsController(
  new GetEventsUseCase(new HttpEventRepository())
)

export const handler = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const data = await getEventsController.handler()
  return data as APIGatewayProxyResult
}
