import Session, { SessionDocument } from '@/db/models/session.model'
import logger from '@/libs/logger'
import { FilterQuery, UpdateQuery } from 'mongoose'

export async function createSessionService(userId: string, userAgent: string): Promise<SessionDocument> {
    try {
        const session = await Session.create({ user: userId, userAgent })
        return session
    } catch (error) {
        logger.error(error)
        throw error
    }
}

export async function findSessionService(query: FilterQuery<SessionDocument>) {
    try {
        const session = await Session.findOne(query)
        return session
    } catch (error) {
        logger.error(error)
        throw error
    }
}

export async function listSessionsService(query: FilterQuery<SessionDocument>) {
    try {
        const sessions = await Session.find(query).lean()
        return sessions
    } catch (error) {
        logger.error(error)
        throw error
    }
}

export async function updateSessionService(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
    try {
        const session = await Session.findOneAndUpdate(query, update)
        return session
    } catch (error) {
        logger.error(error)
        throw error
    }
}

export async function deleteSessionService(query: FilterQuery<SessionDocument>) {
    try {
        const session = await Session.findOneAndDelete(query)
        return session
    } catch (error) {
        logger.error(error)
        throw error
    }
}