import { Resolver, Arg, Ctx, Mutation, UseMiddleware } from 'type-graphql'
import { Context } from '~/types/Context'
import { getCustomRepository } from 'typeorm'
import { CommentRepository } from '~/repository/CommentRepository'
import { Comment } from '~/entity/Comment'
import { CreateCommentInput } from '~/input/comment/CreateCommentInput'
import { UpdateCommentInput } from '~/input/comment/UpdateCommentInput'
import { authentication } from '~/middleware/authentication'

@Resolver()
export class CommentMutationResolver {
  private commentRepository: CommentRepository

  constructor() {
    this.commentRepository = getCustomRepository(CommentRepository)
  }

  @Mutation((_) => Comment)
  @UseMiddleware(authentication)
  async addComment(@Arg('data') params: CreateCommentInput, @Ctx() ctx: Context): Promise<Comment> {
    const userId = ctx.payload?.userId

    const comment = { ...params, ...{ user_id: userId } }

    return await this.commentRepository.save(comment)
  }

  @Mutation((_) => Comment)
  @UseMiddleware(authentication)
  async updateComment(
    @Arg('data') params: UpdateCommentInput,
    @Ctx() ctx: Context,
  ): Promise<Comment> {
    const userId = ctx.payload?.userId

    const comment = { ...params, ...{ user_id: userId } }

    return await this.commentRepository.save(comment)
  }

  @Mutation((_) => String)
  @UseMiddleware(authentication)
  async deleteComment(@Arg('id') id: number): Promise<string> {
    await this.commentRepository.delete(id)

    return `deleted comment id is ${id}.`
  }
}
