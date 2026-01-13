"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Order } from "@/types";

interface OrderHeaderProps {
  order: Order;
}

const statusLabels: Record<string, string> = {
  delivered: "Entregue",
  refunded: "Reembolsado",
  shipped: "Enviado",
  paid: "Pago",
  pending: "Pendente",
  cancelled: "Cancelado",
};

export function OrderHeader({ order }: OrderHeaderProps) {
  const router = useRouter();
  const isRefunded = order.status === "refunded";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
      <Button variant="outline" size="icon" onClick={() => router.back()} className="self-start sm:self-auto">
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <div className="flex-1">
        <h1 className="text-xl sm:text-2xl font-bold flex flex-wrap items-center gap-2">
          <span>Pedido {order.id}</span>
          <Badge variant={isRefunded ? "destructive" : "default"} className="text-xs">
            {statusLabels[order.status] || order.status}
          </Badge>
        </h1>
        <span className="text-xs sm:text-sm text-muted-foreground">
          Realizado em {format(new Date(order.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
        </span>
      </div>
    </div>
  );
}
