import { MaxLength } from 'class-validator'
import { InputType, Field } from 'type-graphql'
import { User } from '../../entity/User'

@InputType({ description: 'New User Argument' })
export class CreateUserInput implements Partial<User> {
  @Field()
  @MaxLength(255)
  firstName?: string

  @Field()
  @MaxLength(255)
  lastName?: string

  @Field()
  age?: number
}
