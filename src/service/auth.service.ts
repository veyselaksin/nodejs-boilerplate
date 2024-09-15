import { RegisterRequest } from '@/types/user'
import User, { UserDocument } from '@/db/models/user.model'
import logger from '@/libs/logger'

export async function registerService(request: RegisterRequest) {
    try {
        return await User.create({
            email: request.body.email,
            name: request.body.name,
            password: request.body.password
        })
    } catch (err) {
        logger.error(err)
        throw err
    }
}

export async function validatePassword({ email, password }: { email: string; password: string }): Promise<UserDocument | null> {
    const user = await User.findOne({ email })
    if (!user) {
        return null
    }

    const isMatch = await user.comparePassword(password)
    return isMatch ? user : null
}

