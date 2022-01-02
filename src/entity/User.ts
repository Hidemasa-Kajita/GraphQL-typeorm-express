import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { Post } from '~/entity/Post'
import { Comment } from '~/entity/Comment'

@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((_) => ID)
  id!: number

  @Column()
  @Field()
  name: string

  @Column()
  @Field()
  email: string

  @Column()
  @Field()
  password: string

  @CreateDateColumn()
  @Field()
  created_at!: Date

  @UpdateDateColumn()
  @Field()
  updated_at!: Date

  constructor(name: string, email: string, password: string) {
    this.name = name
    this.email = email
    this.password = password
  }

  @OneToMany((_) => Post, (posts) => posts.user)
  @Field((_) => [Post])
  posts?: Post[]

  @OneToMany((_) => Comment, (comments) => comments.user)
  @Field((_) => [Comment])
  comments?: Comment[]
}
