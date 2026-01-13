"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Loader2, Mail } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { settingsSchema, type SettingsFormValues } from "@/schemas/settings";

export function SmtpSettingsCard() {
  const [isSaving, setIsSaving] = useState(false);

  const defaultValues: SettingsFormValues = {
    email: "suporte@confrariavintage.com.br",
    appPassword: "",
  };

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues,
  });

  function onSubmit(data: SettingsFormValues) {
    setIsSaving(true);
    
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Configurações atualizadas com sucesso!", {
        description: "O sistema agora utilizará as novas credenciais de envio."
      });
      form.setValue("appPassword", ""); 
    }, 1500);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Conexão SMTP
        </CardTitle>
        <CardDescription>
          Configure o e-mail utilizado para enviar respostas automáticas.
        </CardDescription>
      </CardHeader>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 pt-6">
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    E-mail do Aplicativo
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="ex: contato@suaempresa.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="appPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Senha do Aplicativo
                  </FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••••••••••" {...field} />
                  </FormControl>
                  <FormDescription>
                    Use uma senha de aplicativo, não sua senha pessoal.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

          </CardContent>
          <CardFooter className="border-t bg-muted/10 px-6 py-4">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Configurações
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
