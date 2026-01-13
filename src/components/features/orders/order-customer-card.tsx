"use client";

import { User, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Order } from "@/types";

interface OrderCustomerCardProps {
  order: Order;
}

export function OrderCustomerCard({ order }: OrderCustomerCardProps) {
  return (
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
  );
}
