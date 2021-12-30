import { Resolver, Query, Arg } from 'type-graphql'
import { User } from '../../entity/User'
import { getRepository } from 'typeorm'

@Resolver()
export class UserQueryResolver {
  @Query((_) => User, { nullable: true })
  async user(@Arg('id') id: number): Promise<User | undefined> {
    const userRepository = getRepository(User)

    return await userRepository.findOne(id)
  }

  @Query((_) => [User])
  async users(): Promise<User[]> {
    const userRepository = getRepository(User)

    return await userRepository.find()
  }
}
