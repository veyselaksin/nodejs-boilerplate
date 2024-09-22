import { Response } from 'express'

export type BaseResponse<T> = {
    message: string
    success?: boolean
    data?: T
}

export const SuccessResponse = <T>(res: Response, { data, message }: BaseResponse<T>, status: number = 200): Response => {
    return res.status(status).json({
        success: true,
        message,
        data
    })
}

export const ErrorResponse = <T>(res: Response, { data, message }: BaseResponse<T>, status: number = 500): Response => {
    return res.status(status).json({
        success: false,
        message,
        data
    })
}
