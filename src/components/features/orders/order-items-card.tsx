"use client";

import { Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Order } from "@/types";

interface OrderItemsCardProps {
  order: Order;
}

export function OrderItemsCard({ order }: OrderItemsCardProps) {
  return (
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
  );
}
