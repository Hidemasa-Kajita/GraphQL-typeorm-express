import { EntityRepository, Repository } from 'typeorm'
import { Comment } from '~/entity/Comment'

@EntityRepository(Comment)
export class PostRepository extends Repository<Comment> {}
