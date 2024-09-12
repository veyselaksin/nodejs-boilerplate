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
    if (!user.isModified<keyof User>('password')) {
        return next()
    }

    const rounds = config.get<number>('SALT_WORK_FACTOR')

    const salt = await bcrypt.genSalt(config.get<number>('SALT_WORK_FACTOR'))
    user.password = bcrypt.hashSync(user.password, salt)

    return next()
})

// Compare the password
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = this as UserDocument
    return bcrypt.compare(candidatePassword, user.password).catch(() => false)
}

export default mongoose.model<User>('User', userSchema)
