import { Resolver, Query, Arg, UseMiddleware, Ctx } from 'type-graphql'
import { User } from '../../entity/User'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../../repository/UserRepository'
import { authentication } from '../..//middleware/authentication'
import { Context } from '../../types/Context'

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
