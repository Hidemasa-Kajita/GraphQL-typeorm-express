import { MaxLength } from 'class-validator'
import { InputType, Field } from 'type-graphql'
import { User } from '../../entity/User'

@InputType({ description: 'New User Argument' })
export class CreateUserInput implements Partial<User> {
  @Field()
  @MaxLength(255)
  name?: string

  @Field()
  @MaxLength(255)
  email?: string

  @Field()
  @MaxLength(255)
  password?: string
}
