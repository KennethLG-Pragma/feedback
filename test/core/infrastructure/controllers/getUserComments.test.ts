import { GetUserCommentsController } from '../../../../src/core/insfrastructure/controllers/getUserComments.controller'
import { UserCommentsData,invalidCommentsLimit,invalidUserEmail, userEmail, commentsLimit } from '../../../mocks/UseCasesMocks/createComment'
import { GetUserCommentsUseCase } from '../../../../src/core/app/usecases/getUserComments.usecase'
import { number } from 'zod'

const getUserCommentsUseCase = {
    invoke: jest.fn()
}

const getUserCommentsController = new GetUserCommentsController(
    getUserCommentsUseCase as unknown as GetUserCommentsUseCase
)

describe('GetUserComments controller', () => {
    test('Should return error 400 if request query is invalid', async () => {
      const response = await getUserCommentsController.handler(
        {
            userEmail:invalidUserEmail,
            limit:invalidCommentsLimit
        }
      )
      
  
      const data = JSON.parse(response.body)
  
      expect(response.statusCode).toEqual(400)
      expect(response).toHaveProperty('body')
      expect(data).toHaveProperty('statusCode')
      expect(data).toHaveProperty('message')
      expect(data).toHaveProperty('body')
    })
  
     test('Should return success if request is correct', async () => {
       getUserCommentsUseCase.invoke.mockResolvedValue(
         UserCommentsData
       )
       const response = await getUserCommentsController.handler(
        {
            userEmail:userEmail,
            limit:String(commentsLimit)
        }
       )
       const data = JSON.parse(response.body)
  
       expect(response.statusCode).toEqual(200)
       expect(response).toHaveProperty('body')
       expect(data).toHaveProperty('statusCode')
       expect(data).toHaveProperty('message')
     })
  })
