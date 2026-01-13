"use client";

import { CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Order } from "@/types";

interface OrderPaymentCardProps {
  order: Order;
}

export function OrderPaymentCard({ order }: OrderPaymentCardProps) {
  return (
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
  );
}
