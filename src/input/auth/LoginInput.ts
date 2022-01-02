import { InputType, Field } from 'type-graphql'

@InputType({ description: 'Login Argument' })
export class LoginInput {
  @Field()
  email!: string

  @Field()
  password!: string
}
