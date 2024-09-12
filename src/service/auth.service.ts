import { RegisterRequest } from '@/types/user'
import User from '@/db/models/user.model'
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
