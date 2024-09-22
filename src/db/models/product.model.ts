import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const productSchema = new mongoose.Schema(
    {
        productId: { type: String, required: true, unique: true, default: () => `product_${uuidv4()}` },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            validate: {
                validator: function (v: mongoose.Types.ObjectId) {
                    return mongoose.Types.ObjectId.isValid(v)
                }
            }
        },
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true }
    },
    { timestamps: true }
)

type Product = mongoose.InferSchemaType<typeof productSchema>

export interface ProductDocument extends Product, Document {}

// convert stringUserId to ObjectId before saving
productSchema.pre('save', async function (next) {
    const product = this as ProductDocument
    if (product.isModified('user')) {
        product.user = new mongoose.Types.ObjectId(product.user)
    }
    next()
})

const ProductModel = mongoose.model<ProductDocument>('Product', productSchema)

export default ProductModel
