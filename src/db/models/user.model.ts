import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'
import config from 'config'

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

type User = mongoose.InferSchemaType<typeof userSchema>

export interface UserDocument extends User, mongoose.Document {
    comparePassword(candidatePassword: string): Promise<boolean>
}

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
    const user = this as UserDocument
    if (!user.isModified('password')) {
        return next()
    }

    const rounds = config.get<number>('SALT_WORK_FACTOR')

    try {
        const salt = await bcrypt.genSalt(rounds)
        user.password = await bcrypt.hash(user.password, salt)
        next()
    } catch (error) {
        next(error as Error)
    }
})

// Compare the password
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = this as UserDocument
    try {
        return await bcrypt.compare(candidatePassword, user.password)
    } catch (error) {
        return false
    }
}

const UserModel = mongoose.model<UserDocument>('User', userSchema)

export default UserModel
