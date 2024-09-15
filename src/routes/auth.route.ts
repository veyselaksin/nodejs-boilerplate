import { registerController } from '@/controller/auth.controller'
import { Router } from 'express'
import { validate } from '@/middleware/validator'
import { registerUserValidator, loginUserValidator } from '@/validators/user.validator'
import { loginController } from '@/controller/auth.controller'

export default (app: Router) => {
    // Add your routes here
    app.post('/auth/register', validate(registerUserValidator), registerController)
    app.post('/auth/login', validate(loginUserValidator), loginController)
}
