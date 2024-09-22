import * as mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        valid: { type: Boolean, default: true },
        userAgent: { type: String }
    },
    { timestamps: true }
)

type Session = mongoose.InferSchemaType<typeof sessionSchema>

export interface SessionDocument extends Session, mongoose.Document {}

export default mongoose.model<SessionDocument>('Session', sessionSchema)
