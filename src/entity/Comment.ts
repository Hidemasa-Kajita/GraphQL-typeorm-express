import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { Post } from './Post'
import { User } from './User'

@Entity('comments')
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn()
  @Field((_) => ID)
  id!: number

  @Column()
  @Field((_) => ID)
  user_id: number

  @Column()
  @Field((_) => ID)
  post_id: number

  @Column()
  @Field()
  title: string

  @Column()
  @Field()
  content: string

  @CreateDateColumn()
  @Field()
  created_at!: Date

  @UpdateDateColumn()
  @Field()
  updated_at!: Date

  constructor(user_id: number, post_id: number, title: string, content: string) {
    this.user_id = user_id
    this.post_id = post_id
    this.title = title
    this.content = content
  }

  @ManyToOne((_) => Post, (post) => post.comments)
  @JoinColumn({ name: 'post_id' })
  post?: Post

  @ManyToOne((_) => Comment, (comment) => comment.user)
  @JoinColumn({ name: 'user_id' })
  user?: User
}
