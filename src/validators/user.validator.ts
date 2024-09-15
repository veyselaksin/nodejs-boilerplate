import { body } from 'express-validator'
import logger from '@/libs/logger'

export const registerUserValidator = [
    body('name').notEmpty().withMessage('Name cannot be empty'),
    body('email').notEmpty().withMessage('Email cannot be empty'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('passwordConfirm').notEmpty().withMessage('Password confirm cannot be empty'),
    body('passwordConfirm').isLength({ min: 6 }).withMessage('Password confirm must be at least 6 characters long'),
    body('password')
        .custom((value, { req }) => {
            if (value !== req.body.passwordConfirm) {
                logger.error('Password and confirm password do not match')
                throw new Error('Password and confirm password do not match')
            }
            return true
        })
        .withMessage('Password and confirm password do not match')
]

export const loginUserValidator = [
    body('email').notEmpty().withMessage('Email cannot be empty'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password cannot be empty')
]