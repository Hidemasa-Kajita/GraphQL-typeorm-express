import { Resolver, Arg, Ctx, Mutation } from 'type-graphql'
import { User } from '../../entity/User'
import { Context } from 'apollo-server-core'
import { getRepository } from 'typeorm'
import { CreateUserInput } from '../../input/user/CreateUserInput'
import { UpdateUserInput } from '../../input/user/UpdateUserInput'

@Resolver()
export class UserMutationResolver {
  @Mutation((_) => User)
  async addUser(@Arg('data') params: CreateUserInput, @Ctx() ctx: Context): Promise<User> {
    const userRepository = getRepository(User)

    return await userRepository.save(params)
  }

  @Mutation((_) => User)
  async updateUser(@Arg('data') params: UpdateUserInput): Promise<User> {
    const userRepository = getRepository(User)

    return await userRepository.save(params)
  }

  @Mutation((_) => String)
  async deleteUser(@Arg('id') id: number): Promise<string> {
    const userRepository = getRepository(User)

    await userRepository.delete(id)

    return 'ok'
  }
}
