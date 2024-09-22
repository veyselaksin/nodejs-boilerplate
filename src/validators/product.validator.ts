import { body, param } from 'express-validator'

export const createProductValidator = [
    body('title').notEmpty().withMessage('Title cannot be empty'),
    body('description').notEmpty().withMessage('Description cannot be empty'),
    body('price').notEmpty().withMessage('Price cannot be empty').isNumeric().withMessage('Price must be a number'),
    body('image').notEmpty().withMessage('Image cannot be empty')
]

export const updateProductValidator = [
    param('productId').notEmpty().withMessage('Product ID cannot be empty'),
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('description').optional().notEmpty().withMessage('Description cannot be empty'),
    body('price').optional().notEmpty().withMessage('Price cannot be empty').isNumeric().withMessage('Price must be a number'),
    body('image').optional().notEmpty().withMessage('Image cannot be empty')
]

export const deleteProductValidator = [
    param('productId').notEmpty().withMessage('Product ID cannot be empty')
]

export const getProductValidator = [
    param('productId').notEmpty().withMessage('Product ID cannot be empty')
]
