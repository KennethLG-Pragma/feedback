import { z } from 'zod'
import errorMessages from './../utils/errorMessages'

export const queryParamsGetUsersSchema = z
  .object({
    group: z.string().optional(),
    user: z.string().optional(),
    page: z
      .string({
        required_error: errorMessages.PAGE_QUERY_REQUIRED
      })
      .regex(/^[0-9]+$/, {
        message: errorMessages.PAGE_QUERY_IS_INTEGER
      }),
    limit: z
      .string({
        required_error: errorMessages.LIMIT_QUERY_REQUIRED
      })
      .regex(/^[0-9]+$/, {
        message: errorMessages.LIMIT_QUERY_IS_INTEGER
      })
  })
  .strict()

export type QueryGetUsersDTO = z.infer<typeof queryParamsGetUsersSchema>
