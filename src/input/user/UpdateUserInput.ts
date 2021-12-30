import { MaxLength } from 'class-validator'
import { InputType, Field } from 'type-graphql'
import { User } from '../../entity/User'

@InputType({ description: 'Update User Argument' })
export class UpdateUserInput implements Partial<User> {
  @Field()
  id!: number

  @Field()
  @MaxLength(255)
  firstName?: string

  @Field()
  @MaxLength(255)
  lastName?: string

  @Field()
  age?: number
}
