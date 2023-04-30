import { Tenant } from "../../domain/tenant";
import { LookupTenantGateway } from "../../domain/tenant/lookupTenant";

class StabLookupTenantGateway implements LookupTenantGateway {
    lookupTenant = async (apiKey: string): Promise<Tenant> => {
        return {
            email: 'joe@doe.org',
            apiKey: apiKey
        }
    }
}