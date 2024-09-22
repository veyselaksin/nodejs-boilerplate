import { Router } from 'express'
import { validate } from '@/middleware/validator'
import { createProductValidator } from '@/validators/product.validator'
import { createProductController } from '@/controller/product.controller'
import { requireUser } from '@/middleware/auth'

export default (app: Router) => {
    // Add your routes here
    app.post('/product', requireUser, validate(createProductValidator), createProductController)
}
