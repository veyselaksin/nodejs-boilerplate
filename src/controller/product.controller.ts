import { Response } from 'express'
import { CreateProductRequest } from '@/types/product'
import logger from '@/libs/logger'
import { SuccessResponse, ErrorResponse } from '@/common/response'
import { createProductService } from '@/service/product.service'

export async function createProductController(req: CreateProductRequest, res: Response) {
    try {
        const userId: string = res.locals.user.id

        const product = await createProductService(userId, req)
        return SuccessResponse(res, { data: product, message: 'Product created successfully' })
    } catch (err) {
        logger.error(err)
        return ErrorResponse(res, { message: 'Failed to create product' })
    }
}
