import jwt from 'jsonwebtoken'

interface UserInfoType {
  given_name: string
  family_name: string
  email: string
}

export const getIdTokenPayload = (token: string): UserInfoType => {
  const payload = jwt.decode(token) as UserInfoType
  return {
    given_name: payload.given_name,
    family_name: payload.family_name,
    email: payload.email
  }
}
