import { Resolver, Arg, Ctx, Mutation } from 'type-graphql'
import { User } from '../../entity/User'
import { Context } from 'apollo-server-core'
import { getCustomRepository } from 'typeorm'
import { CreateUserInput } from '../../input/user/CreateUserInput'
import { UpdateUserInput } from '../../input/user/UpdateUserInput'
import { UserRepository } from '../../repository/UserRepository'

@Resolver()
export class UserMutationResolver {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = getCustomRepository(UserRepository)
  }

  @Mutation((_) => User)
  async addUser(@Arg('data') params: CreateUserInput, @Ctx() ctx: Context): Promise<User> {
    return await this.userRepository.save(params)
  }

  @Mutation((_) => User)
  async updateUser(@Arg('data') params: UpdateUserInput): Promise<User> {
    return await this.userRepository.save(params)
  }

  @Mutation((_) => String)
  async deleteUser(@Arg('id') id: number): Promise<string> {
    await this.userRepository.delete(id)

    return 'ok'
  }
}
