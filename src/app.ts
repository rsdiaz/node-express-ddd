import express, { Express } from 'express'
import userRouter from './interfaces/api/v1/routes/user_routes'
import morgan from 'morgan'

export default (app: Express) => {

  app.disable('x-powered-by')

  app.use(express.json())
  app.use(morgan('dev'))

  app.use('/api/v1/users', userRouter)
}
