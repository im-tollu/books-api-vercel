import { Router, Request, Response, NextFunction } from "express"

export const userRoutes = (): Router => {
    const router = Router()

    router.post('/', async (req: Request, res: Response, next: NextFunction) => {
        res.json('user registered')
    })

    return router
}