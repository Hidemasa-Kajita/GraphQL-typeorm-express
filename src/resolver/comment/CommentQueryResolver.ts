import { Resolver, Query, Arg, UseMiddleware } from 'type-graphql'
import { getCustomRepository } from 'typeorm'
import { CommentRepository } from '../../repository/CommentRepository'
import { Comment } from '../../entity/Comment'
import { authentication } from '../../middleware/authentication'

@Resolver()
export class CommentQueryResolver {
  private commentRepository: CommentRepository

  constructor() {
    this.commentRepository = getCustomRepository(CommentRepository)
  }

  @Query((_) => Comment, { nullable: true })
  @UseMiddleware(authentication)
  async comment(@Arg('id') id: number): Promise<Comment | undefined> {
    return await this.commentRepository.findOne(id, {
      relations: ['user', 'post'],
    })
  }

  @Query((_) => [Comment])
  @UseMiddleware(authentication)
  async comments(): Promise<Comment[]> {
    return await this.commentRepository.find({
      relations: ['user', 'post'],
    })
  }
}
