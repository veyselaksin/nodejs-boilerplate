import { Request } from 'express'

export interface RegisterRequest extends Request {
    body: {
        name: string
        email: string
        password: string
        passwordConfirm: string
    }
}

export interface LoginRequest extends Request {
    body: {
        email: string
        password: string
    }
}