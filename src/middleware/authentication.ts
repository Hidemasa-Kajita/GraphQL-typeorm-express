import { MiddlewareFn } from 'type-graphql'
import { verify } from 'jsonwebtoken'
import { Context } from '~/types/Context'
import { secretKey } from '~/config/jwt'

export const authentication: MiddlewareFn<Context> = ({ context }, next) => {
  const authorization = context.req.headers['authorization']

  if (!authorization) {
    throw new Error('Not authenticated')
  }

  try {
    const token = (authorization as string).split(' ')[1]
    const payload = verify(token, secretKey)
    context.payload = payload as Context['payload']
  } catch (err) {
    throw new Error('Not authenticated')
  }

  return next()
}
