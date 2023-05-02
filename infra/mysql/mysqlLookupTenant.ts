import { PrismaClient, Prisma } from "@prisma/client";
import { Tenant, tenantSchema } from "../../domain/tenant";
import { LookupTenantGateway } from "../../domain/tenant/lookupTenant";


export class MysqlLookupTenantGateway implements LookupTenantGateway {
    constructor(
        private db: PrismaClient
    ) { }

    lookupTenant = async (apiToken: string): Promise<Tenant | null> => {
        const foundTenant = await this.db.tenant.findFirst({
            where: {
                apiToken
            }
        })
        if (!foundTenant) {
            return null
        }

        return tenantSchema.parse(foundTenant)
    }
}