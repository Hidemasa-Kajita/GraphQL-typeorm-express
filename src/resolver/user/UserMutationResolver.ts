import { Resolver, Arg, Mutation, UseMiddleware } from 'type-graphql'
import { getCustomRepository } from 'typeorm'
import { hash } from 'bcryptjs'
import { User } from '~/entity/User'
import { CreateUserInput } from '~/input/user/CreateUserInput'
import { UpdateUserInput } from '~/input/user/UpdateUserInput'
import { UserRepository } from '~/repository/UserRepository'
import { authentication } from '~/middleware/authentication'

@Resolver()
export class UserMutationResolver {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = getCustomRepository(UserRepository)
  }

  @Mutation((_) => User)
  async addUser(@Arg('data') params: CreateUserInput): Promise<User> {
    const password = await hash(params.password, 10)

    return await this.userRepository.save({ ...params, ...{ password } })
  }

  @Mutation((_) => User)
  @UseMiddleware(authentication)
  async updateUser(@Arg('data') params: UpdateUserInput): Promise<User> {
    return await this.userRepository.save(params)
  }

  @Mutation((_) => String)
  @UseMiddleware(authentication)
  async deleteUser(@Arg('id') id: number): Promise<string> {
    await this.userRepository.delete(id)

    return `deleted user id is ${id}.`
  }
}
