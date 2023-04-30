import express, { Request, Response, NextFunction, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { ZodError } from "zod";
import { StubAddTenantGateway } from '../infra/stub/stubAddTenant';
import { statusRoutes } from '../routes/statusRoutes';
import { tenantRoutes } from '../routes/tenantRoutes';
import { MysqlAddTenantGateway } from "../infra/mysql/mysqlAddTenant";

const prisma = new PrismaClient()
const app = express();

const appRouter = Router()
app.use('/api', appRouter)

appRouter.use('/', statusRoutes())

const addTenantGateway = new MysqlAddTenantGateway(prisma)
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