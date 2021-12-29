import { EntityRepository } from 'typeorm'
import { User } from '../entity/User'

@EntityRepository(User)
export class UserRepository {
  public findById(id: number) {
    return id
  }
}
