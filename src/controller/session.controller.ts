import { Request, Response } from 'express'
import { listSessionsService, updateSessionService } from '@/service/session.service'
import { SuccessResponse } from '@/common/response'

export async function listSessionsController(req: Request, res: Response) {
    const userId = res.locals.user.id

    const sessions = await listSessionsService({ user: userId, valid: true })
    return SuccessResponse(res, { data: sessions, message: 'Sessions listed successfully' })

}


export async function deleteSessionController(req: Request, res: Response) {
    const sessionId = res.locals.user.session;

    await updateSessionService({ _id: sessionId }, { valid: false })
    return SuccessResponse(res, { data: null, message: 'Session deleted successfully' })
}

export async function updateSessionController(req: Request, res: Response) {
    const sessionId = req.params.sessionId
    await updateSessionService({ _id: sessionId }, { valid: false })
    return SuccessResponse(res, { data: null, message: 'Session updated successfully' })
}