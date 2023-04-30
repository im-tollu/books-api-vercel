import { v4 as uuidv4 } from "uuid";
import { PrismaClient, Prisma } from "@prisma/client";
import { Tenant, tenantSchema } from "../../domain/tenant";
import { AddTenantGateway, NewTenant } from "../../domain/tenant/addTenant";
import { TenantAlreadyRegistered } from "../../errors";

export class MysqlAddTenantGateway implements AddTenantGateway {
    constructor(
        private db: PrismaClient
    ) { }

    addTenant = async (newTenant: NewTenant): Promise<Tenant> => {
        try {
            const insertedTenant = await this.db.tenant.create({
                data: {
                    email: newTenant.email,
                    apiKey: uuidv4()
                }
            })
            return tenantSchema.parse(insertedTenant)
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
                throw new TenantAlreadyRegistered(newTenant.email)
            }
            throw (err)
        }
    }
}