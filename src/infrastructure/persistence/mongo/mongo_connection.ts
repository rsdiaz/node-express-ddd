import mongoose from 'mongoose'
import env from '../../../env'

class MongoConnection {
  conn: any

  constructor() {
    this.conn = false
  }

  async connect() {
    try {
      const MONGODB_CONNECTION_STRING = env.MONGO_URI
      this.conn = await mongoose.connect(MONGODB_CONNECTION_STRING)
      console.log('[*] - Connected to MongoDB successfully')
    } catch (error) {
      console.error('Error connecting to MongoDB', error)
      process.exit(1)
    }
  }
}

const instance = new MongoConnection()

export default instance