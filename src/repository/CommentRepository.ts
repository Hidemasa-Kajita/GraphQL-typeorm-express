import { EntityRepository, Repository } from 'typeorm'
import { Comment } from '~/entity/Comment'

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {}
