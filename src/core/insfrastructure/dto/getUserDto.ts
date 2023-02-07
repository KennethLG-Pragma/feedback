import { z } from 'zod'
import errorMessages from './../utils/errorMessages'

export const getUserPathParams = z
  .object({
    user: z
      .string({
        required_error: errorMessages.USER_PATH_REQUIRED
      })
      .email({
        message: errorMessages.USER_EMAIL_PATH_IS_EMAIL
      })
  })
  .strict()

export type UserPathParams = z.infer<typeof getUserPathParams>
