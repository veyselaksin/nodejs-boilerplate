import logger from '@/libs/logger'
import { CreateProductRequest, UpdateProductRequest, CreateProductResponse, GetProductResponse, UpdateProductResponse } from '@/types/product'
import Product, { ProductDocument } from '@/db/models/product.model'

export async function createProductService(userId: any, request: CreateProductRequest): Promise<CreateProductResponse> {
    try {
        const product = await Product.create({
            user: userId,
            title: request.body.title,
            description: request.body.description,
            price: request.body.price,
            image: request.body.image
        })

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

export async function listProductsService(userId: any): Promise<GetProductResponse[]> {
    try {
        const products = await Product.find({ user: userId }).lean()
        return products.map((product) => ({
            id: product.productId,
            title: product.title,
            description: product.description,
            price: product.price,
            image: product.image
        })) as GetProductResponse[]
    } catch (err) {
        logger.error(err)
        throw new Error('Failed to list products')
    }
}

export async function getProductService(userId: any, productId: string): Promise<GetProductResponse | null> {
    try {
        const product = await Product.findOne({ productId: productId, user: userId })
        if (!product) {
            return null
        }
        return {
            id: product.productId,
            title: product.title,
            description: product.description,
            price: product.price,
            image: product.image
        } as GetProductResponse
    } catch (err) {
        logger.error(err)
        throw new Error('Failed to get product')
    }
}

export async function updateProductService(userId: any, productId: string, request: UpdateProductRequest): Promise<UpdateProductResponse | null> {
    try {
        const product = await Product.findOne({ productId: productId, user: userId })
        if (!product) {
            return null
        }
        if (request.body.title) {
            product.title = request.body.title!
        }
        if (request.body.description) {
            product.description = request.body.description!
        }
        if (request.body.price) {
            product.price = request.body.price!
        }
        if (request.body.image) {
            product.image = request.body.image!
        }
        await product.save()

        return {
            id: product.productId,
            title: product.title,
            description: product.description,
            price: product.price,
            image: product.image
        } as UpdateProductResponse
    } catch (err) {
        logger.error(err)
        throw new Error('Failed to update product')
    }
}

export async function deleteProductService(userId: any, productId: string): Promise<boolean> {
    try {
        const result = await Product.findOneAndDelete({ productId: productId, user: userId })
        return result !== null
    } catch (err) {
        logger.error(err)
        throw new Error('Failed to delete product')
    }
}
