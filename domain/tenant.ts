import { z } from "zod";

export const tenantSchema = z.object({
    email: z.string().email(),
    apiKey: z.string().uuid()
})

export type Tenant = z.infer<typeof tenantSchema>