import { Request, Response } from 'express'
import { RegisterUserService } from '../../../../application/services/register_user_service'
import { UserRepositoryMongo } from '../../../../infrastructure/persistence/mongo/user_repository_mongo'
import { UserService } from '../../../../application/services/user_service'

export class UserController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body
      const userRepository = new UserRepositoryMongo()
      const registerUserService = new RegisterUserService(userRepository)
      const user = await registerUserService.execute({ email, password })

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: { id: user.id, email: user.email },
      })
    } catch (error) {
      res.status(400).json({ success: false, message: error.message })
    }
  }

  async findByEmail(request: Request, response: Response): Promise<void> {
    try {
      const { email } = request.query

      const userRepository = new UserRepositoryMongo()
      const userService = new UserService(userRepository)
      const user = await userService.findByEmail(email as string)

      response.status(201).json({
        success: true,
        message: 'User find successfully',
        data: user,
      })
    } catch (error) {
      response.status(400).json({ success: false, message: error.message })
    }
  }

  async findById(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.params

      const userRepository = new UserRepositoryMongo()
      const userService = new UserService(userRepository)
      const user = await userService.findById(id)

      response.status(201).json({
        success: true,
        message: 'User find successfully',
        data: user,
      })
    } catch (error) {
      response.status(400).json({ success: false, message: error.message })
    }
  }
}
