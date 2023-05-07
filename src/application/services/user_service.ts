import { UserRepository } from '../../domain/repositories/user_repository';
import { User } from '../../domain/models/user';

export class UserService {
  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email)

    return user
  }
}