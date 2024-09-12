import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import { ErrorResponse } from '@/common/response'

export const validate = (validator: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // Run the array of validators
        await Promise.all(validator.map((rule: any) => rule.run(req)))

        // Check for validation errors
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            // return res.status(422).json({ errors: errors.array() })
            const format: string = `Validation error: ${errors
                .array()
                .map((e: any) => `- ${e.msg}`)
                .join('\n')}`

            return ErrorResponse(res, { data: null, message: format }, 422)
        }
        next()
    }
}
