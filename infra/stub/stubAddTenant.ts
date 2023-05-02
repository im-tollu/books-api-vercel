import uuid from "uuid";
import { Tenant } from "../../domain/tenant";
import { AddTenantGateway, NewTenant } from "../../domain/tenant/addTenant";

export const DUMMY_UUID = uuid.parse('00000000-0000-0000-0000-000000000000')

export class StubAddTenantGateway implements AddTenantGateway {
    addTenant = async (newTenant: NewTenant): Promise<Tenant> => {
        return {
            email: newTenant.email,
            apiToken: DUMMY_UUID
        }
    }
}