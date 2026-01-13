"use client";

import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Order } from "@/types";

interface OrderAddressCardProps {
  order: Order;
}

export function OrderAddressCard({ order }: OrderAddressCardProps) {
  return (
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
  );
}
