import { Request, Response } from 'express'
import logger from '@/libs/logger'
import { ErrorResponse, SuccessResponse } from '@/common/response'
import { registerService } from '@/service/auth.service'
import { RegisterRequest } from '@/types/user'

export async function registerController(req: RegisterRequest, res: Response) {
    try {
        const user = await registerService(req)

        return SuccessResponse(res, { data: user, message: 'User created successfully' })
    } catch (error) {
        logger.error(error)
        return ErrorResponse(res, { data: null, message: 'Failed to create user' })
    }
}
