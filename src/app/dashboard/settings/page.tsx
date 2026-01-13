"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Save, Loader2, Key, Mail, Store, CheckCircle2 } from "lucide-react";
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
import { Label } from "@/components/ui/label"; // Componente novo necessário
import { Separator } from "@/components/ui/separator";

// Schema de validação (Apenas para o formulário de E-mail)
const settingsSchema = z.object({
  email: z.string().email("Digite um e-mail válido."),
  appPassword: z.string().min(8, "A senha deve ter pelo menos 8 caracteres."),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);

  // Valores padrão
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
    
    // Simula uma chamada de API
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Configurações atualizadas com sucesso!", {
        description: "O sistema agora utilizará as novas credenciais de envio."
      });
      form.setValue("appPassword", ""); 
    }, 1500);
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Configurações</h1>
      </div>

      <div className="grid gap-6">
        
        {/* NOVO: Card de Integração Shopify (Baseado na sua imagem) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Configurações da Loja
            </CardTitle>
            <CardDescription>
              Informações sobre sua loja conectada à Shopify
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="storeName">Nome da Loja</Label>
              <Input 
                id="storeName" 
                defaultValue="Minha Loja Shopify" 
                readOnly 
                className="bg-muted text-muted-foreground" 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="storeUrl">URL da Loja</Label>
              <Input 
                id="storeUrl" 
                defaultValue="minhaloja.myshopify.com" 
                readOnly 
                className="bg-muted text-muted-foreground" 
              />
            </div>

            <div className="grid gap-2">
              <Label>Status da Integração</Label>
              <div className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                Conectado
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card de SMTP (Mantido) */}
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
      </div>
    </div>
  );
}