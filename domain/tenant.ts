import { z } from "zod";

export const tenantSchema = z.object({
    tenantId: z.number().int(),
    email: z.string().email(),
    apiToken: z.string().uuid()
})

export type Tenant = z.infer<typeof tenantSchema>