"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowLeft, Mail, Package, User, CreditCard, MapPin, Phone } from "lucide-react";

import { useStore } from "@/store/use-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { RefundModal } from "@/components/features/refunds/refund-modal";

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { getOrderById, getEmailsByOrder } = useStore();

  const orderId = params.id as string;
  const order = getOrderById(orderId);
  const relatedEmails = getEmailsByOrder(orderId);

  if (!order) {
    return <div className="p-8">Pedido não encontrado</div>;
  }

  const isRefunded = order.status === "refunded";

  return (
    <div className="flex flex-col gap-4 md:gap-6 max-w-5xl mx-auto w-full px-4 sm:px-6">
      {/* Header com Navegação */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()} className="self-start sm:self-auto">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl font-bold flex flex-wrap items-center gap-2">
            <span>Pedido {order.id}</span>
            <Badge variant={isRefunded ? "destructive" : "default"} className="text-xs">
              {order.status === "delivered" ? "Entregue" : 
               order.status === "refunded" ? "Reembolsado" : 
               order.status === "shipped" ? "Enviado" :
               order.status === "paid" ? "Pago" :
               order.status === "pending" ? "Pendente" :
               order.status === "cancelled" ? "Cancelado" : order.status}
            </Badge>
          </h1>
          <span className="text-xs sm:text-sm text-muted-foreground">
            Realizado em {format(new Date(order.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </span>
        </div>
        
        {/* Ação Principal: Refund */}
        <div className="w-full sm:w-auto">
          {!isRefunded ? (
            <RefundModal order={order} />
          ) : (
            <Button variant="outline" disabled className="w-full sm:w-auto opacity-50 cursor-not-allowed">
              Reembolso Processado
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:gap-6 md:grid-cols-3">
        {/* Coluna Principal: Detalhes e Itens */}
        <div className="md:col-span-2 space-y-4 md:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                <Package className="h-4 w-4" />
                Itens do Pedido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2 sm:gap-3">
                {order.items.map((item, index) => (
                  <li key={index} className="flex justify-between items-center py-2 border-b last:border-0 text-sm">
                    <span>{item}</span>
                    <span className="text-muted-foreground text-xs sm:text-sm">1 un.</span>
                  </li>
                ))}
              </ul>
              <Separator className="my-3 sm:my-4" />
              <div className="flex justify-between font-bold text-base sm:text-lg">
                <span>Total</span>
                <span>{order.currency} {order.amount.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Histórico Visual de E-mails Relacionados */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                <Mail className="h-4 w-4" />
                Comunicações Relacionadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {relatedEmails.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  {relatedEmails.map((email) => (
                    <div 
                      key={email.id} 
                      className="flex flex-col p-3 border rounded-lg bg-muted/20 cursor-pointer hover:bg-muted/40 transition-colors"
                      onClick={() => router.push('/dashboard/inbox')}
                    >
                      <div className="flex justify-between items-start mb-1 gap-2">
                        <span className="font-semibold text-xs sm:text-sm flex-1">{email.subject}</span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {format(new Date(email.date), "dd/MM")}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {email.thread[0].content}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-muted-foreground py-4">
                  Nenhum e-mail vinculado a este pedido.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Direita: Cliente e Pagamento */}
        <div className="space-y-4 md:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                <User className="h-4 w-4" />
                Cliente
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-1 text-xs sm:text-sm">
              <div className="font-medium">{order.customerName}</div>
              <div className="text-muted-foreground break-all">{order.customerEmail}</div>
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <Phone className="h-3 w-3" />
                <span>{order.customerPhone}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                <CreditCard className="h-4 w-4" />
                Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-1 text-xs sm:text-sm">
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">ID</span>
                <span className="font-medium text-xs break-all text-right">{order.payment.id}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Método</span>
                <span className="font-medium text-right">{order.payment.method}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Parcelas</span>
                <span className="font-medium">{order.payment.installments}x</span>
              </div>
              <div className="flex justify-between gap-2 pt-2 border-t">
                <span className="text-muted-foreground">Valor</span>
                <span className="font-medium">{order.currency} {order.payment.amount.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                <MapPin className="h-4 w-4" />
                Endereço de Entrega
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-1 text-xs sm:text-sm">
              <div className="font-medium">
                {order.address.street}, {order.address.number}
              </div>
              {order.address.complement && (
                <div className="text-muted-foreground text-xs">
                  {order.address.complement}
                </div>
              )}
              <div className="text-muted-foreground">
                {order.address.neighborhood}
              </div>
              <div className="text-muted-foreground">
                {order.address.city} - {order.address.state}
              </div>
              <div className="text-muted-foreground">
                CEP: {order.address.zipCode}
              </div>
              <div className="text-muted-foreground text-xs">
                {order.address.country}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}