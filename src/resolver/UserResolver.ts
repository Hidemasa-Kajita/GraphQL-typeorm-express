import { Resolver, Query, InputType, Field, Arg, Ctx, Mutation } from 'type-graphql'
import { User } from '../entity/User'
import { Context } from 'apollo-server-core'
import { getRepository } from 'typeorm'

@InputType({ description: 'New User Argument' })
class AddUserInput implements Partial<User> {
  @Field()
  firstName!: string
  @Field()
  lastName!: string
  @Field()
  age!: number
}

@Resolver()
export class UserResolver {
  @Query((returns) => User, { nullable: true })
  async user(@Arg('id') id: number): Promise<User | undefined> {
    const userRepository = getRepository(User)

    return userRepository.findOne(id)
  }

  @Mutation((returns) => User)
  async addUser(@Arg('data') newUser: AddUserInput, @Ctx() ctx: Context): Promise<User> {
    const userRepository = getRepository(User)

    return userRepository.save(newUser)
  }
}
