"use client";

import { AlertCircle } from "lucide-react";
import { useStore } from "@/store/use-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefundsTable } from "@/components/features/refunds";

export default function RefundsPage() {
  const { orders } = useStore();
  const refundedOrders = orders.filter((order) => order.refund !== undefined);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Gestão de Reembolsos</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico ({refundedOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {refundedOrders.length > 0 ? (
            <RefundsTable orders={refundedOrders} />
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-muted-foreground gap-2">
              <AlertCircle className="h-10 w-10 opacity-20" />
              <p>Nenhum reembolso registrado até o momento.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}