import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";
import { Tenant } from "../../domain/tenant";
import { AddTenantGateway, NewTenant } from "../../domain/tenant/addTenant";

export class MysqlAddTenantGateway implements AddTenantGateway {
    constructor(
        private db: PrismaClient
    ) { }

    addTenant = async (newTenant: NewTenant): Promise<Tenant> => {
        const insertedTenant = await this.db.tenant.create({
            data: {
                email: newTenant.email,
                apiKey: uuidv4()
            }
        })
        return insertedTenant
    }
}