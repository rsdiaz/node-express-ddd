import MongoDB from './infrastructure/persistence/mongo/mongo_connection'
import express, { Express } from 'express'
import app from './app'
import env from './env'
import { AddressInfo } from 'net'
class Server {
  app: Express
  mongoDB: any
  server: import('http').Server<
    typeof import('http').IncomingMessage,
    typeof import('http').ServerResponse
  >

  constructor() {
    this.app = express()
    this.mongoDB = null
  }

  async start() {
    app(this.app)

    this.mongoDB = await MongoDB.connect()

    this.server = this.app.listen(env.PORT, () => {
      const addressInfo = this.server.address() as AddressInfo
      const { address } = addressInfo
      const host = address === '::' ? 'localhost' : address
      const port = env.PORT
      const url = `http://${host}:${port}`
      const environment = env.ENV

      if (process.env.NODE_ENV !== 'test') {
        console.log(`[*] - Express API REST listen in ${environment} mode  : -> ${url}`)
      }
    })

    return this.server
  }
}

const server = new Server()

if (!module.loaded) {
  server.start()
}

process.on('unhandledRejection', (err) => {
  console.log('Custom Error: An unhandledRejection occurred')
  console.log(`Custom Error: Rejection: ${err}`)
})