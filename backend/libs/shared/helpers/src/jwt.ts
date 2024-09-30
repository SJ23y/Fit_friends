import { User, TokenPayload } from '@backend/shared-core'

export function createJwtPayload(user: User): TokenPayload {
  return {
    sub: user.id,
    name: user.name
  }
}
