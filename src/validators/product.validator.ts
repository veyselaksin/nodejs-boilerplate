import { body } from 'express-validator'

export const createProductValidator = [
    body('title').notEmpty().withMessage('Name cannot be empty'),
    body('description').notEmpty().withMessage('Description cannot be empty'),
    body('price').notEmpty().withMessage('Price cannot be empty').isNumeric().withMessage('Price must be a number'),
    body('image').notEmpty().withMessage('Image cannot be empty')
]
