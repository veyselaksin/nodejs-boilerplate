import { Router } from 'express'
import { listSessionsController, deleteSessionController } from '@/controller/session.controller'
import { requireUser } from '@/middleware/auth'

export default (app: Router) => {
    app.get('/sessions', requireUser, listSessionsController)
    app.delete('/sessions/', requireUser, deleteSessionController)
}