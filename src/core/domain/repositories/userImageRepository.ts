import { UserImageEntity } from '../entities/userImageEntity'

export interface UserImageRepository {
  getUserImages: (email: string) => Promise<UserImageEntity[] | null>
}
