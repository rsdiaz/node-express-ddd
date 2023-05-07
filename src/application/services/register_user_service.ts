import { User } from '../../domain/models/user'
import { UserRepository } from '../../domain/repositories/user_repository'

export class RegisterUserService {
  private _userRepository: UserRepository
  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  async execute({email, password}: { email: string, password: string }): Promise<User> {
    const existingUser = await this._userRepository.findByEmail(email)

    if (existingUser) {
      throw new Error(`User ${email} already exists`)
    }

    const user = new User(null, email, password)
    await this._userRepository.save(user)

    return user
  }
}