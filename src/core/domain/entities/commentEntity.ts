import { UserImageEntity } from './userImageEntity'

export interface CommentEntity {
  userEmail: string
  leaderEmail: string
  leaderName: string
  comment?: string
  commentDate: string
  event: string
  assistance?: boolean
  punctuality?: boolean
  leaderImages: UserImageEntity[] | null
}
