import { CommentEntity } from '../entities/commentEntity'
import { LastCommentValueObject } from '../valueObjects/lastCommentValueObject'

export interface CommentRepository {
  getOnlyComments: (
    userEmail: string,
    commentsLength: number
  ) => Promise<CommentEntity[]>
  getUserComments: (
    userEmail: string,
    commentsLength: number,
    commentDatePagination?: string
  ) => Promise<{
    comments: CommentEntity[]
    lastItem?: LastCommentValueObject
  }>
  createComments: (comments: CommentEntity[]) => Promise<CommentEntity[]>
}
