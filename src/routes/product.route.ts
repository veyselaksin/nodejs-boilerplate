import { Router } from 'express'
import { validate } from '@/middleware/validator'
import { createProductValidator, getProductValidator, updateProductValidator, deleteProductValidator } from '@/validators/product.validator'
import { createProductController, getProductController, updateProductController, deleteProductController, listProductsController } from '@/controller/product.controller'
import { requireUser } from '@/middleware/auth'

export default (app: Router) => {
    // Add your routes here
    app.post('/product', requireUser, validate(createProductValidator), createProductController)
    app.get('/product', requireUser, listProductsController)
    app.get('/product/:productId', requireUser, validate(getProductValidator), getProductController)
    app.patch('/product/:productId', requireUser, validate(updateProductValidator), updateProductController)
    app.delete('/product/:productId', requireUser, validate(deleteProductValidator), deleteProductController)
}
