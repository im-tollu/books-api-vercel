import express, { Router } from 'express'
import { StubAddTenantGateway } from '../infra/stub/stubAddTenant';
import { statusRoutes } from '../routes/statusRoutes';
import { tenantRoutes } from '../routes/tenantRoutes';

const app = express();

const appRouter = Router()
app.use('/api', appRouter)

appRouter.use('/', statusRoutes())

const addTenantGateway = new StubAddTenantGateway()
appRouter.use('/tenants', tenantRoutes(addTenantGateway))

export default app