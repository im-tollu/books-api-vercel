import { Router, Request, Response, NextFunction } from "express"
import { addTenantCommandSchema, AddTenantGateway, AddTenantHandler } from "../domain/tenant/addTenant"

export const tenantRoutes = (addTenantGateway: AddTenantGateway): Router => {
    const router = Router()

    router.post('/', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const command = addTenantCommandSchema.parse(req.body)
            const handler = new AddTenantHandler(addTenantGateway)

            const tenant = await handler.handle(command)

            res.json(tenant)
        } catch (e) {
            next(e)
        }
    })

    return router
}