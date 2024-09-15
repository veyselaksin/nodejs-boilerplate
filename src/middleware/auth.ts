import { Request, Response, NextFunction } from 'express'
import { verifyJwt } from '@/utils/jwt'
import logger from '@/libs/logger'
import { ErrorResponse } from '@/common/response'
import { findSessionService } from '@/service/session.service'
import { signJwt } from '@/utils/jwt' // Add this import

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = getAccessTokenFromHeader(req)
    if (!accessToken) {
        return next()
    }

    const refreshToken = getRefreshTokenFromHeader(req)
    if (!refreshToken) {
        return next()
    }

    try {
        const { decoded, expired } = verifyJwt(accessToken)
        if (decoded) {
            res.locals.user = decoded
        }

        if (expired && refreshToken) {
            const newAccessToken = await reIssueAccessToken(refreshToken)
            if (newAccessToken) {
                res.setHeader('x-access-token', newAccessToken)
                const { decoded: newDecoded } = verifyJwt(newAccessToken)
                if (newDecoded) {
                    res.locals.user = newDecoded
                }
            }
        }
    } catch (error) {
        logger.error(error)
        throw error
    }
    next()
}

const getAccessTokenFromHeader = (req: Request): string | null => {
    const authorization = req.headers.authorization
    if (!authorization) {
        return null
    }
    const accessToken = authorization.split(' ')[1]
    return accessToken
}

// x-refresh is the refresh token
const getRefreshTokenFromHeader = (req: Request): string | null => {
    const refreshToken = req.headers['x-refresh']
    if (!refreshToken) {
        return null
    }
    // Handle potential array of refresh tokens
    return Array.isArray(refreshToken) ? refreshToken[0] : refreshToken
}

export async function reIssueAccessToken(refreshToken: string): Promise<string | null> {
    const { decoded } = verifyJwt(refreshToken);
    if (!decoded || typeof decoded === 'string' || !('session' in decoded)) {
        return null;
    }

    const session = await findSessionService({ _id: decoded.session })
    if (!session || !session.valid) {
        return null
    }
    const user = { id: session.user }
    return signJwt(user, { expiresIn: '15m' }) // Adjust the expiration time as needed
}

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user
    if (!user) {
        return next(ErrorResponse(res, { data: null, message: 'Unauthorized' }, 401))
    }
    next()
}