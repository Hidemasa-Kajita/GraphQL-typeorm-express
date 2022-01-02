import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { User } from './User'
import { Comment } from './Comment'

@Entity('posts')
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field((_) => ID)
  id!: number

  @Column()
  @Field((_) => ID)
  user_id: number

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

  constructor(user_id: number, title: string, content: string) {
    this.user_id = user_id
    this.title = title
    this.content = content
  }

  @ManyToOne((_) => User, (user) => user.posts)
  @JoinColumn({ name: 'user_id' })
  user?: User

  @OneToMany((_) => Comment, (comments) => comments.post)
  comments?: Comment[]
}
