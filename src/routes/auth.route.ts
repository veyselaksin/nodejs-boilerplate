import { registerController } from '@/controller/auth.controller'
import { Router } from 'express'
import { validate } from '@/middleware/validator'
import { registerUserValidator } from '@/validators/user.validator'

export default (app: Router) => {
    // Add your routes here
    app.post('/auth/register', validate(registerUserValidator), registerController)
}
