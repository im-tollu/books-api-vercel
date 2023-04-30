export class GatewayError implements Error {
    name: string = GatewayError.name
    message: string = 'Failed to complete request'

    constructor(public reason: unknown) { }
}

export class TenantAlreadyRegistered implements Error {
    name: string = TenantAlreadyRegistered.name
    message: string

    constructor(public email: string) {
        this.message = `Tenant already registered: ${email}`
    }
}