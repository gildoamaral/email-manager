import * as z from "zod";

export const settingsSchema = z.object({
  email: z.string().email("Digite um e-mail válido."),
  appPassword: z.string().min(8, "A senha deve ter pelo menos 8 caracteres."),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;
