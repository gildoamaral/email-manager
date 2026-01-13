import * as z from "zod";

export const refundSchema = z.object({
  reason: z.string().min(1, "Por favor selecione um motivo."),
  items: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Selecione pelo menos um item para reembolso.",
  }),
  notes: z.string().optional(),
});

export type RefundFormData = z.infer<typeof refundSchema>;
