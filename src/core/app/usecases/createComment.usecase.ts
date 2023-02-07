import { CommentEntity } from 'src/core/domain/entities/commentEntity'
import { InvalidDataError } from '../../domain/exceptions/InvalidDataError'
import { CommentRepository } from 'src/core/domain/repositories/commentRepository'
import { UserImageRepository } from 'src/core/domain/repositories/userImageRepository'
import errorMessages from '../../domain/utils/errorMessages'
import { CreateCommentDTO } from '../dto/createCommentDTO'

export class CreateCommentUseCase {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly userImageRepository: UserImageRepository
  ) {}

  validComments(comments: CreateCommentDTO[]): boolean {
    let isValid = true
    for (const comment of comments) {
      if (!comment.comment && typeof comment.assistance === 'undefined') {
        isValid = false
        break
      }
    }

    return isValid
  }

  validPunctuality(comments: CreateCommentDTO[]): boolean {
    let isValid = true
    for (const comment of comments) {
      if (
        typeof comment.punctuality !== 'undefined' &&
        typeof comment.assistance === 'undefined'
      ) {
        isValid = false
        break
      }
    }

    return isValid
  }

  async invoke(
    commentData: CreateCommentDTO[],
    leaderEmail: string
  ): Promise<CommentEntity[]> {
    const isValidComments = this.validComments(commentData)
    if (!isValidComments) {
      throw new InvalidDataError(errorMessages.INVALID_COMMENT_ERROR)
    }
    const isValidPunctuality = this.validPunctuality(commentData)
    if (!isValidPunctuality) {
      throw new InvalidDataError(errorMessages.INVALID_PUNCTUALITY_ERROR)
    }

    const commentDate = new Date().toISOString()
    const leaderImages = await this.userImageRepository.getUserImages(leaderEmail)
    const commentEntities: CommentEntity[] = commentData.map((commentData) => {
      return {
        ...commentData,
        commentDate,
        leaderImages
      }
    })
    const comments = await this.commentRepository.createComments(commentEntities)
    return comments
  }
}
