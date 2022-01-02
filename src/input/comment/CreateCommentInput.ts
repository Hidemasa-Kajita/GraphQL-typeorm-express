import { MaxLength } from 'class-validator'
import { InputType, Field } from 'type-graphql'
import { Comment } from '~/entity/Comment'

@InputType({ description: 'New Comment Argument' })
export class CreateCommentInput implements Partial<Comment> {
  @Field()
  post_id!: number

  @Field()
  @MaxLength(255)
  title!: string

  @Field()
  @MaxLength(255)
  content!: string
}
