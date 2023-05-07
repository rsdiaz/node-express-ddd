import express, { Router } from 'express'
import { UserController } from '../controllers/user_controller'

const userRouter: Router = express.Router()
const userController = new UserController()

userRouter.post('/register', userController.register)

export default userRouter
