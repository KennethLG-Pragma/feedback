import { UserRepositoryError } from '../../domain/exceptions/userRespositoryError'
import { UserImageRepository } from '../../domain/repositories/userImageRepository'
import { UserEntity } from '../../domain/entities/userEntity'
import { UserRepository } from '../../domain/repositories/userRepository'

export class GetUsersUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userImageRepository: UserImageRepository
  ) {}

  async invoke(
    page: string,
    limit: string,
    user?: string
  ): Promise<{ users: UserEntity[], length: number }> {
    const result = await this.userRepository.getUsers(page, limit, user)
    if (!result) {
      throw new UserRepositoryError('Request to get Users Failed')
    }
    const users: UserEntity[] = []
    for (const user of result.users) {
      const { email } = user
      const images = await this.userImageRepository.getUserImages(email)
      users.push({ ...user, images })
    }
    return {
      users,
      length: result.length
    }
  }
}
