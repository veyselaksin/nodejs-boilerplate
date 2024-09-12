import * as mongoose from 'mongoose'
import logger from '@/libs/logger'
import config from 'config'

const connectDB = async () => {
    try {
        await mongoose.connect(config.get<string>('MONGO_URI'))
        logger.info('MongoDB connected')
    } catch (error) {
        logger.error('MongoDB connection failed')
        process.exit(1)
    }
}

export default connectDB
