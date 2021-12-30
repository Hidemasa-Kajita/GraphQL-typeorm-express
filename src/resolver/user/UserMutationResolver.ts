import { Resolver, Arg, Ctx, Mutation } from 'type-graphql'
import { User } from '../../entity/User'
import { Context } from 'apollo-server-core'
import { getRepository } from 'typeorm'
import { CreateUserInput } from '../../input/user/CreateUserInput'

@Resolver()
export class UserMutationResolver {
  @Mutation((returns) => User)
  async addUser(@Arg('data') newUser: CreateUserInput, @Ctx() ctx: Context): Promise<User> {
    const userRepository = getRepository(User)

    return await userRepository.save(newUser)
  }
}
