import { Resolver, Arg, Ctx, Mutation } from 'type-graphql'
import { getCustomRepository } from 'typeorm'
import { Context } from '~/types/Context'
import { PostRepository } from '~/repository/PostRepository'
import { CreatePostInput } from '~/input/post/CreatePostInput'
import { Post } from '~/entity/Post'
import { UpdatePostInput } from '~/input/post/UpdatePostInput'

@Resolver()
export class PostMutationResolver {
  private postRepository: PostRepository

  constructor() {
    this.postRepository = getCustomRepository(PostRepository)
  }

  @Mutation((_) => Post)
  async addPost(@Arg('data') params: CreatePostInput, @Ctx() ctx: Context): Promise<Post> {
    const userId = ctx.payload?.userId

    const post = { ...params, ...{ user_id: userId } }

    return await this.postRepository.save(post)
  }

  @Mutation((_) => Post)
  async updatePost(@Arg('data') params: UpdatePostInput, @Ctx() ctx: Context): Promise<Post> {
    const userId = ctx.payload?.userId

    const post = { ...params, ...{ user_id: userId } }

    return await this.postRepository.save(post)
  }

  @Mutation((_) => String)
  async deletePost(@Arg('id') id: number): Promise<string> {
    await this.postRepository.delete(id)

    return `deleted post id is ${id}.`
  }
}
