import { Tenant } from "../tenant";

export interface LookupTenantQuery {
    apiToken: string
}

export interface LookupTenantGateway {
    lookupTenant: (apiToken: string) => Promise<Tenant | null>
}

export class LookupTenantHandler {
    constructor(private gateway: LookupTenantGateway) { }

    async handle(query: LookupTenantQuery): Promise<Tenant | null> {
        return await this.gateway.lookupTenant(query.apiToken)
    }
}