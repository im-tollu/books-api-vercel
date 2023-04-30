import { Tenant } from "../../domain/tenant";
import { AddTenantGateway, NewTenant } from "../../domain/tenant/addTenant";

export class StubAddTenantGateway implements AddTenantGateway {
    addTenant = async (newTenant: NewTenant): Promise<Tenant> => {
        return {
            email: newTenant.email,
            apiKey: '1234' + newTenant.email
        }
    }
}