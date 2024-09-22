import logger from '@/libs/logger'
import { CreateProductRequest, CreateProductResponse } from '@/types/product'
import Product, { ProductDocument } from '@/db/models/product.model'

export async function createProductService(userId: any, request: CreateProductRequest): Promise<CreateProductResponse> {
    try {
        const product = await Product.create({
            user: userId,
            title: request.body.title,
            description: request.body.description,
            price: request.body.price,
            image: request.body.image
        } as ProductDocument)

        return {
            id: product.productId,
            title: product.title,
            description: product.description,
            price: product.price,
            image: product.image
        } as CreateProductResponse
    } catch (err) {
        logger.error(err)
        throw new Error('Failed to create product')
    }
}
