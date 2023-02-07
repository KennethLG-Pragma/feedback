import { z } from 'zod'
import errorMessages from './../utils/errorMessages'

export const getUserCommentsSchema = z
  .object({
    userEmail: z
      .string({
        required_error: errorMessages.USER_EMAIL_QUERY_REQUIRED
      })
      .email({
        message: errorMessages.USER_EMAIL_QUERY_IS_EMAIL
      }),
    limit: z
      .string({
        required_error: errorMessages.LIMIT_QUERY_REQUIRED
      })
      .regex(/^[0-9]+$/, {
        message: errorMessages.LIMIT_QUERY_IS_INTEGER
      }),
    commentDatePagination: z.string().optional(),
    onlyComments: z.string().optional()
  })
  .strict()

export type GetUserCommentsDTO = z.infer<typeof getUserCommentsSchema>
