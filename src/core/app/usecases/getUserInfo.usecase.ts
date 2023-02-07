import { UserRepositoryError } from './../../domain/exceptions/userRespositoryError'
import { UserRepository } from './../../domain/repositories/userRepository'

export class GetUserInfoUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async invoke(email: string): Promise<Record<string, unknown>> {
    const userInfo = await this.userRepository.getUserInfo(email)
    if (!userInfo) throw new UserRepositoryError('Request to get user info failed')

    return userInfo
  }
}
