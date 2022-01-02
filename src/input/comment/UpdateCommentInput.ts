import { MaxLength } from 'class-validator'
import { InputType, Field } from 'type-graphql'
import { Comment } from '../../entity/Comment'

@InputType({ description: 'New Post Argument' })
export class UpdateCommentInput implements Partial<Comment> {
  @Field()
  id!: number

  @Field()
  post_id!: number

  @Field()
  @MaxLength(255)
  title?: string

  @Field()
  @MaxLength(255)
  content?: string
}
