import { Router, Request, Response } from "express"
import { AddTenantGateway, AddTenantHandler } from "../domain/tenant/addTenant"

export const tenantRoutes = (addTenantGateway: AddTenantGateway): Router => {
    const router = Router()

    router.post('/', async (req: Request, res: Response) => {
        const command = {
            email: 'joe@doe.org'
        }
        const handler = new AddTenantHandler(addTenantGateway)

        const tenant = await handler.handle(command)

        res.json(tenant)
    })

    return router
}