import { CommentRepository } from 'src/core/domain/repositories/commentRepository'
import { ResponseCommentDTO } from '../dto/responseCommentDTO'

interface GetCommentFilters {
  onlyComments?: string
}

export class GetUserCommentsUseCase {
  constructor(private readonly commentRepository: CommentRepository) {}

  async invoke(
    userEmail: string,
    commentsLength: number,
    commentDatePagination?: string,
    filters?: GetCommentFilters
  ): Promise<ResponseCommentDTO> {
    if (filters?.onlyComments) {
      const onlyComments = await this.commentRepository.getOnlyComments(
        userEmail,
        commentsLength
      )
      return {
        comments: onlyComments
      }
    }

    const comments = await this.commentRepository.getUserComments(
      userEmail,
      commentsLength,
      commentDatePagination
    )

    return comments
  }
}
