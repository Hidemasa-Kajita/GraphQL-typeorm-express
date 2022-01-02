import { Resolver, Query, Arg, UseMiddleware } from 'type-graphql'
import { getCustomRepository } from 'typeorm'
import { PostRepository } from '~/repository/PostRepository'
import { Post } from '~/entity/Post'
import { authentication } from '~/middleware/authentication'

@Resolver()
export class PostQueryResolver {
  private postRepository: PostRepository

  constructor() {
    this.postRepository = getCustomRepository(PostRepository)
  }

  @Query((_) => Post, { nullable: true })
  @UseMiddleware(authentication)
  async post(@Arg('id') id: number): Promise<Post | undefined> {
    return await this.postRepository.findOne(id, {
      relations: ['user', 'comments'],
    })
  }

  @Query((_) => [Post])
  @UseMiddleware(authentication)
  async posts(): Promise<Post[]> {
    return await this.postRepository.find({
      relations: ['user', 'comments'],
    })
  }
}
