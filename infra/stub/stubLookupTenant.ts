import { Tenant } from "../../domain/tenant";
import { LookupTenantGateway } from "../../domain/tenant/lookupTenant";

class StabLookupTenantGateway implements LookupTenantGateway {
    lookupTenant = async (apiToken: string): Promise<Tenant> => {
        return {
            tenantId: 123,
            email: 'joe@doe.org',
            apiToken
        }
    }
}