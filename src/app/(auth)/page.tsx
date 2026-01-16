"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Package2 } from "lucide-react";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("Digite um e-mail válido."),
  password: z.string().min(1, "A senha é obrigatória."),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginValues) {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (data.email) {
      toast.success("Login realizado com sucesso!", {
        description: "Redirecionando para o dashboard...",
      });
      
      router.push("/dashboard");
    } else {
      setIsLoading(false);
    }
  }

  return (
    <Card className="border-none shadow-xl h-[calc(80vh)] sm:h-auto py-10">
      <CardHeader className="space-y-1 text-center mb-4">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
            <Package2 className="h-6 w-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">Acesse sua conta</CardTitle>
        <CardDescription>
          Entre com suas credenciais para gerenciar a loja
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="admin@loja.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Senha</FormLabel>
                  </div>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
