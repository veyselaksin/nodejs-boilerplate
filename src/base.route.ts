import express, { Express, Request, Response } from 'express'
import { SuccessResponse } from '@/common/response'
import authRoute from '@/routes/auth.route'
import sessionRoute from '@/routes/session.route'

export default (app: Express) => {
    app.get('/health', (req: Request, res: Response) => {
        return SuccessResponse(res, { data: null, message: 'Server is running' }, 200)
    })

    // Add your routes here
    const http = express.Router()
    app.use('/v1', http)

    authRoute(http)
    sessionRoute(http)
}
