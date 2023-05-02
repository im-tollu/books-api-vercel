import express, { Request, Response, NextFunction, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { ZodError } from "zod";
import { statusRoutes } from '../routes/statusRoutes';
import { tenantRoutes } from '../routes/tenantRoutes';
import { MysqlAddTenantGateway } from "../infra/mysql/mysqlAddTenant";
import { TenantAlreadyRegistered } from "../errors";
import { userRoutes } from "../routes/userRoutes";
import { TenantVerifier } from "../routes/verifyTenant";
import { MysqlLookupTenantGateway } from "../infra/mysql/mysqlLookupTenant";
import { LookupTenantHandler } from "../domain/tenant/lookupTenant";
import "../requestExtension";

const prisma = new PrismaClient()
const addTenantGateway = new MysqlAddTenantGateway(prisma)
const lookupTenantGateway = new MysqlLookupTenantGateway(prisma)
const lookupTenantHandler = new LookupTenantHandler(lookupTenantGateway)
const tenantVerifier = new TenantVerifier(lookupTenantHandler)

const app = express();

const appRouter = Router()
app.use('/api', appRouter)

appRouter.use('/', statusRoutes())


appRouter.use('/tenants', tenantRoutes(addTenantGateway))
appRouter.use('/users', tenantVerifier.verify, userRoutes())

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ZodError) {
        res.status(400).json(err.format())
        return
    }

    if (err instanceof TenantAlreadyRegistered) {
        res.status(409).json(err.message)
        return
    }

    console.error(err)
    res.status(500).send('Something broke!')
})

export default app