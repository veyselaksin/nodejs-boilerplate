import express, { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import logger from '@/libs/logger'
import connectDB from '@/db/connection'
import routes from '@/base.route'
import bodyParser from 'body-parser'
import config from 'config'
import { ErrorResponse } from '@/common/response'

const app = express()
const PORT: number = config.get<number>('APP_PORT')

// Body parser
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

const srv = app.listen(PORT, async () => {
    logger.info(`Server is running on http://localhost:${PORT}`)
    await connectDB()

    routes(app)

    app.use((req: Request, res: Response, next: NextFunction) => {
        console.log('Time:', Date.now())
        next(ErrorResponse(res, { data: null, message: 'Not found' }, 404))
    })

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        console.log('Error:', err)
        return ErrorResponse(res, { data: null, message: err.message }, 500)
    })
})

// Graceful shutdown function
const gracefulShutdown = () => {
    logger.info('Received kill signal, shutting down gracefully...')

    srv.close(err => {
        if (err) {
            console.error('Error closing server:', err)
            process.exit(1)
        }

        mongoose.connection.close(false).then(() => {
            console.log('MongoDB connection closed')
            process.exit(0)
        })
    })
}

// Listen for termination signals
process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)
