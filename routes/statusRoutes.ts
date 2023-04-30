import { Router, Request, Response } from 'express'

export const statusRoutes = (): Router => {
    const router = Router()

    router.get('/hello', (req: Request, res: Response) => {
        res.json('Hello!')
    })

    router.get('/health-check', async (req: Request, res: Response) => {
        const response = {
            at: new Date().toISOString()
        }

        res.json(response)
    })

    return router
}



