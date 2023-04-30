import { Tenant } from "../tenant"

export interface AddTenantCommand {
    email: string
}

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