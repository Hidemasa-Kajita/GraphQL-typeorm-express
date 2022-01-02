import { MaxLength } from 'class-validator'
import { InputType, Field } from 'type-graphql'
import { Post } from '../../entity/Post'

@InputType({ description: 'Update Post Argument' })
export class UpdatePostInput implements Partial<Post> {
  @Field()
  id!: number

  @Field()
  @MaxLength(255)
  title?: string

  @Field()
  @MaxLength(255)
  content?: string
}
