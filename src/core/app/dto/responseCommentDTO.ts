import { CommentEntity } from 'src/core/domain/entities/commentEntity'
import { LastCommentValueObject } from 'src/core/domain/valueObjects/lastCommentValueObject'

export interface ResponseCommentDTO {
  comments: CommentEntity[]
  lastItem?: LastCommentValueObject
}
