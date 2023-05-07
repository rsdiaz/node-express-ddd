import 'dotenv/config'

const env = {
  NODE_ENV: process.env.NODE_ENV,
  ENV: process.env.ENV || 'development',
  PORT: process.env.PORT || 3000,
  MONGO_URI:
    process.env.NODE_ENV === 'production'
      ? process.env.MONGO_PRODUCTION_URI
      : process.env.MONGO_DEVELOPMENT_URI ,
}

export default env
