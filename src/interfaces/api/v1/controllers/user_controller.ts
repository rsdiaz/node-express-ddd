import { Request, Response } from 'express'
import { RegisterUserService } from '../../../../application/services/register_user_service'
import { UserRepositoryMongo } from '../../../../infrastructure/persistence/mongo/user_repository_mongo'

export class UserController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body
      const userRepository = new UserRepositoryMongo()
      const registerUserService = new RegisterUserService(userRepository)
      const user = await registerUserService.execute({ email, password })

      res
        .status(201)
        .json({
          success: true,
          message: 'User registered successfully',
          data: { id: user.id, email: user.email },
        })
    } catch (error) {
      res.status(400).json({ success: false, message: error.message })
    }
  }
}
