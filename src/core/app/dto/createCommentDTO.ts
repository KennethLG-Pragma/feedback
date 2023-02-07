export interface CreateCommentDTO {
  userEmail: string
  leaderEmail: string
  leaderName: string
  comment?: string
  event: string
  assistance?: boolean
  punctuality?: boolean
}
