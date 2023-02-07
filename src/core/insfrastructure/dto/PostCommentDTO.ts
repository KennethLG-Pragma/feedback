import { z } from 'zod'
import errorMessages from './../utils/errorMessages'

export const postCommentSchema = z
  .object({
    userEmail: z
      .string({
        required_error: errorMessages.USER_EMAIL_REQUIRED
      })
      .email({
        message: errorMessages.USER_EMAIL_IS_EMAIL
      }),
    leaderEmail: z
      .string({
        required_error: errorMessages.LEADER_EMAIL_REQUIRED
      })
      .email({
        message: errorMessages.LEADER_EMAIL_IS_EMAIL
      }),
    leaderName: z.string({
      required_error: errorMessages.LEADER_NAME_REQUIRED
    }),
    event: z.string({
      required_error: errorMessages.EVENT_COMMENT_REQUIRED
    }),
    comment: z.string().optional(),
    assistance: z.boolean().optional(),
    punctuality: z.boolean().optional()
  })
  .strict()

export type PostCommentDTO = z.infer<typeof postCommentSchema>
