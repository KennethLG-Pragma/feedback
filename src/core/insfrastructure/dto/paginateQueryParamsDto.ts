import { z } from 'zod'
import errorMessages from './../utils/errorMessages'

export const paginateQueryParams = z
  .object({
    group: z.string({
      required_error: errorMessages.GROUP_QUERY_REQUIRED
    }),
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

export type PaginateQueryParams = z.infer<typeof paginateQueryParams>
