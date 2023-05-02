import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { LookupTenantHandler } from "../domain/tenant/lookupTenant";

const API_KEY_HEADER = 'X-Api-Key'

const apiTokenSchema = z.string().uuid()

export class TenantVerifier {
    constructor(private tenantLookup: LookupTenantHandler) { }

    verify = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const apiToken = apiTokenSchema.parse(req.get(API_KEY_HEADER))
            const tenant = await this.tenantLookup.handle({ apiToken })
            console.log('tenant', JSON.stringify(tenant, undefined, 2))
            if (!tenant) {
                res.status(401).send()
                return
            }
            req.tenantId = tenant.tenantId
        } catch (err) {
            if (err instanceof ZodError) {
                const message = `${API_KEY_HEADER} must contain valid API key`
                res.status(401).json(message)
                return
            }

            throw (err)
        }

    }
}