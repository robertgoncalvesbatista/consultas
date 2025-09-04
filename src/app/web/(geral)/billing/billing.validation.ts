import * as z from "zod";

export const billingValidation = z.object({
  valor: z.string(),
});

export type BillingValidator = z.infer<typeof billingValidation>;
