import { MaxLength } from 'class-validator'
import { InputType, Field } from 'type-graphql'
import { Post } from '../../entity/Post'

@InputType({ description: 'New Post Argument' })
export class CreatePostInput implements Partial<Post> {
  @Field()
  @MaxLength(255)
  title!: string

  @Field()
  @MaxLength(255)
  content!: string
}
