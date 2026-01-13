"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useStore } from "@/store/use-store";
import { Order } from "@/types";

// Schema de validação
const refundSchema = z.object({
  reason: z.string().min(1, "Por favor selecione um motivo."),
  items: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Selecione pelo menos um item para reembolso.",
  }),
  notes: z.string().optional(),
});

interface RefundModalProps {
  order: Order;
}

export function RefundModal({ order }: RefundModalProps) {
  const [open, setOpen] = useState(false);
  const { processRefund } = useStore();

  const form = useForm<z.infer<typeof refundSchema>>({
    resolver: zodResolver(refundSchema),
    defaultValues: {
      items: [], // Começa vazio
      notes: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof refundSchema>) {
    // Simulação de delay de API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Executa a ação na Store Global
    processRefund(order.id, values.reason);

    toast.success(`Reembolso do pedido ${order.id} processado!`, {
      description: `Motivo: ${values.reason}`,
    });

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Solicitar Refund</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Solicitar Reembolso</DialogTitle>
          <DialogDescription>
            Pedido <strong>{order.id}</strong> - {order.customerName}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {/* Campo: Motivo (Select) */}
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motivo do Reembolso</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um motivo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="defeito">Produto com defeito</SelectItem>
                      <SelectItem value="arrependimento">Arrependimento (7 dias)</SelectItem>
                      <SelectItem value="envio_errado">Envio incorreto</SelectItem>
                      <SelectItem value="extravio">Extravio na transportadora</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo: Itens (Checkbox) */}
            <FormField
              control={form.control}
              name="items"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Itens a reembolsar</FormLabel>
                  </div>
                  <div className="space-y-2 border p-3 rounded-md max-h-37.5 overflow-y-auto">
                    {order.items.map((item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="items"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item])
                                      : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item
                                        )
                                      );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer text-sm">
                                {item}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo: Observações (Textarea) */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações Internas</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Adicione detalhes sobre a aprovação..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="destructive" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Confirmar Refund
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}