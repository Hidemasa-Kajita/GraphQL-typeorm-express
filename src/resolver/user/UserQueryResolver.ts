import { Resolver, Query, Arg } from 'type-graphql'
import { User } from '../../entity/User'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../../repository/UserRepository'

@Resolver()
export class UserQueryResolver {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = getCustomRepository(UserRepository)
  }

  @Query((_) => User, { nullable: true })
  async user(@Arg('id') id: number): Promise<User | undefined> {
    return await this.userRepository.findOne(id)
  }

  @Query((_) => [User])
  async users(): Promise<User[]> {
    return await this.userRepository.find()
  }
}
