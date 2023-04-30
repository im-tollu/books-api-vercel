import express, { Request, Response, NextFunction, Router } from 'express'
import { ZodError } from 'zod';
import { StubAddTenantGateway } from '../infra/stub/stubAddTenant';
import { statusRoutes } from '../routes/statusRoutes';
import { tenantRoutes } from '../routes/tenantRoutes';

const app = express();

const appRouter = Router()
app.use('/api', appRouter)

appRouter.use('/', statusRoutes())

const addTenantGateway = new StubAddTenantGateway()
appRouter.use('/tenants', tenantRoutes(addTenantGateway))

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ZodError) {
        res.status(400).json(err.format())
        return
    }

    console.error(err.stack)
    res.status(500).send('Something broke!')
})

export default app