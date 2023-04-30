import { z } from "zod";
import { Tenant } from "../tenant";

export const addTenantCommandSchema = z.object({
    email: z.string().email()
})

export type AddTenantCommand = z.infer<typeof addTenantCommandSchema>

export interface NewTenant {
    email: string
}

export interface AddTenantGateway {
    addTenant: (newTenant: NewTenant) => Promise<Tenant>
}

export class AddTenantHandler {
    constructor(private gateway: AddTenantGateway) { }

    async handle(command: AddTenantCommand): Promise<Tenant> {
        const newTenant = {
            email: command.email
        }
        return await this.gateway.addTenant(newTenant)
    }
}