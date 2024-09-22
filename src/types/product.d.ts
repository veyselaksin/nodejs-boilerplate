import { Request } from 'express'

interface ProductDetails {
    title: string
    description: string
    price: number
    image: string
}

export interface CreateProductRequest extends Request {
    body: ProductDetails
}

export interface CreateProductResponse {
    id: string
    title: string
    description: string
    price: number
    image: string
}

export interface UpdateProductRequest extends Request {
    body: Partial<ProductDetails> // Assuming fields can be optional for updates
}
