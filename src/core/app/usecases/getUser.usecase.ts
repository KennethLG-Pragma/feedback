import { NotFoundError } from '../../domain/exceptions/NotFoundError'
import { UserImageRepository } from '../..//domain/repositories/userImageRepository'
import { UserEntity } from '../../domain/entities/userEntity'
import { UserRepository } from '../../domain/repositories/userRepository'

export class GetUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userImageRepository: UserImageRepository
  ) {}

  async invoke(user: string): Promise<UserEntity> {
    const result = await this.userRepository.getUserByEmail(user)
    if (!result) {
      throw new NotFoundError('user not found')
    }

    const { email } = result
    const images = await this.userImageRepository.getUserImages(email)

    return { ...result, images }
  }
}
