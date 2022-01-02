import { Arg, Field, Mutation, ObjectType } from 'type-graphql'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '~/repository/UserRepository'
import { LoginInput } from '../input/auth/LoginInput'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcryptjs'
import { secretKey } from '~/config/jwt'

@ObjectType()
class LoginResponse {
  @Field()
  access_token!: string
}

export class AuthResolver {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = getCustomRepository(UserRepository)
  }

  @Mutation((_) => LoginResponse)
  async login(@Arg('data') { email, password }: LoginInput): Promise<LoginResponse> {
    const user = await this.userRepository.findOne({ where: { email } })

    if (!user) {
      throw new Error('Could not find user')
    }

    const verify = await compare(password, user.password)

    if (!verify) {
      throw new Error('Bad password')
    }

    return {
      access_token: sign({ userId: user.id }, secretKey, {
        expiresIn: '15m',
      }),
    }
  }
}
