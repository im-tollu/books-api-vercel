import { Tenant } from "../tenant";

export interface LookupTenantQuery {
    apiKey: string
}

export interface LookupTenantGateway {
    lookupTenant: (apiKey: string) => Promise<Tenant>
}

export class LookupTenantHandler {
    constructor(private gateway: LookupTenantGateway) { }

    async handle(query: LookupTenantQuery): Promise<Tenant> {
        return await this.gateway.lookupTenant(query.apiKey)
    }
}