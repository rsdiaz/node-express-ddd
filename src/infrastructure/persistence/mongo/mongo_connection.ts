import mongoose from 'mongoose'
import env from '../../../env'

export class MongoConnection {
  private static instance: MongoConnection
  conn: any

  public async connect() {
    try {
      const MONGODB_CONNECTION_STRING = env.MONGO_URI
      this.conn = await mongoose.connect(MONGODB_CONNECTION_STRING)
      console.log('[*] - Connected to MongoDB successfully')
    } catch (error) {
      console.error('Error connecting to MongoDB', error)
      process.exit(1)
    }
  }

  static getInstance(): MongoConnection {
    if(!MongoConnection.instance) {
      MongoConnection.instance = new MongoConnection()
    }

    return MongoConnection.instance
  }
}
