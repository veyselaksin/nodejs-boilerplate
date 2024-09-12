import { Request } from 'express'

export interface RegisterRequest extends Request {
    body: {
        name: string
        email: string
        password: string
        passwordConfirm: string
    }
}
