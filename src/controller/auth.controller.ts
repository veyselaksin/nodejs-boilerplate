import { Request, Response } from 'express'
import logger from '@/libs/logger'
import { ErrorResponse, SuccessResponse } from '@/common/response'
import { registerService } from '@/service/auth.service'
import { RegisterRequest } from '@/types/user'
import { validatePassword } from '@/service/auth.service'
import { signJwt } from '@/utils/jwt'
import { createSessionService } from '@/service/session.service'


export async function registerController(req: RegisterRequest, res: Response) {
    try {
        const user = await registerService(req)

        return SuccessResponse(res, { data: user, message: 'User created successfully' })
    } catch (error) {
        logger.error(error)
        return ErrorResponse(res, { data: null, message: 'Failed to create user' })
    }
}

export async function loginController(req: Request, res: Response) {
    // validate the user password
    const user = await validatePassword({ email: req.body.email, password: req.body.password })
    if (!user) {
        return ErrorResponse(res, { data: null, message: 'Invalid email or password' }, 401)
    }

    // create a session
    const session = await createSessionService(user._id as string, req.get('user-agent') as string)
    
    // create an access token
    const accessToken = signJwt({ ...user, session: session._id }, { expiresIn: '15m' })

    // create a refresh token
    const refreshToken = signJwt({ ...user, session: session._id }, { expiresIn: '1y' })

    // send the tokens to the client
    return SuccessResponse(res, { data: { accessToken, refreshToken }, message: 'Login successful' })
}
