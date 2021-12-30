import { InputType, Field } from 'type-graphql'
import { User } from '../../entity/User'

@InputType({ description: 'Update User Argument' })
export class UpdateUserInput implements Partial<User> {
  @Field()
  id!: number
  @Field()
  firstName?: string
  @Field()
  lastName?: string
  @Field()
  age?: number
}
