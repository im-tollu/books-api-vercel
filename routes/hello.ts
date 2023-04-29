import { Request, Response } from "express"

export function hello(req: Request, res: Response) {
    res.json('Hello!')
}