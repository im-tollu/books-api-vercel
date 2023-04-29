import { Request, Response } from "express"

export function healthCheck(req: Request, res: Response) {
    res.json({
        at: new Date().toISOString()
    })
}