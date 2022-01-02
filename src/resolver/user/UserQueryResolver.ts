import { Resolver, Query, Arg, UseMiddleware } from 'type-graphql'
import { getCustomRepository } from 'typeorm'
import { User } from '~/entity/User'
import { UserRepository } from '~/repository/UserRepository'
import { authentication } from '~/middleware/authentication'

@Resolver()
export class UserQueryResolver {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = getCustomRepository(UserRepository)
  }

  @Query((_) => User, { nullable: true })
  @UseMiddleware(authentication)
  async user(@Arg('id') id: number): Promise<User | undefined> {
    return await this.userRepository.findOne(id, {
      relations: ['posts', 'posts.comments'],
    })
  }

  @Query((_) => [User])
  @UseMiddleware(authentication)
  async users(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['posts', 'posts.comments'],
    })
  }
}
