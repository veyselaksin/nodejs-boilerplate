import { Response, Request } from 'express'
import { CreateProductRequest, UpdateProductRequest } from '@/types/product'
import logger from '@/libs/logger'
import { SuccessResponse, ErrorResponse } from '@/common/response'
import { createProductService, listProductsService, deleteProductService, getProductService, updateProductService } from '@/service/product.service'

export async function listProductsController(req: Request, res: Response) {
    try {
        const userId: string = res.locals.user.id
        const products = await listProductsService(userId)
        return SuccessResponse(res, { data: products, message: 'Products listed successfully' })
    } catch (err) {
        logger.error(err)
        return ErrorResponse(res, { message: 'Failed to list products' })
    }
}

export async function getProductController(req: Request, res: Response) {
    try {
        const userId: string = res.locals.user.id
        const productId: string = req.params.productId
        const product = await getProductService(userId, productId)
        return SuccessResponse(res, { data: product, message: 'Product fetched successfully' })
    } catch (err) {
        logger.error(err)
        return ErrorResponse(res, { message: 'Failed to get product' })
    }
}

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

export async function updateProductController(req: UpdateProductRequest, res: Response) {
    try {
        const userId: string = res.locals.user.id
        const productId: string = req.params.productId
        const product = await updateProductService(userId, productId, req)
        return SuccessResponse(res, { data: product, message: 'Product updated successfully' })
    } catch (err) {
        logger.error(err)
        return ErrorResponse(res, { message: 'Failed to update product' })
    }
}

export async function deleteProductController(req: Request, res: Response) {
    try {
        const userId: string = res.locals.user.id
        const productId: string = req.params.productId
        const result = await deleteProductService(userId, productId)
        return SuccessResponse(res, { data: result, message: 'Product deleted successfully' })
    } catch (err) {
        logger.error(err)
        return ErrorResponse(res, { message: 'Failed to delete product' })
    }
}
