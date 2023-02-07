import { UserEntity } from '../entities/userEntity'

export interface UserRepository {
  getUserInfo: (email: string) => Promise<Record<string, unknown> | null>
  getUsers: (
    page: string,
    limit: string,
    user?: string
  ) => Promise<{ users: UserEntity[]; length: number } | null>
  getUsersByGroup: (
    group: string,
    page: string,
    limit: string,
    user?: string
  ) => Promise<{ users: UserEntity[]; length: number } | null>
  getUserByEmail: (user: string) => Promise<UserEntity | null>
}
