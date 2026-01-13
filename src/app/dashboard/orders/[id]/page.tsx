"use client";

import { useParams } from "next/navigation";
import { useStore } from "@/store/use-store";
import { Button } from "@/components/ui/button";
import { RefundModal } from "@/components/features/refunds";
import {
  OrderHeader,
  OrderItemsCard,
  OrderEmailsCard,
  OrderCustomerCard,
  OrderPaymentCard,
  OrderAddressCard,
} from "@/components/features/orders";

export default function OrderDetailsPage() {
  const params = useParams();
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
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <OrderHeader order={order} />
        
        {/* Ação Principal: Refund */}
        <div className="w-full sm:w-auto">
          {!isRefunded ? (
            <RefundModal order={order} />
          ) : (
            <Button variant="outline" disabled className="w-full sm:w-auto opacity-50 cursor-not-allowed">
              Já Reembolsado
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:gap-6 md:grid-cols-3">
        {/* Coluna Principal: Detalhes e Itens */}
        <div className="md:col-span-2 space-y-4 md:space-y-6">
          <OrderItemsCard order={order} />
          <OrderEmailsCard emails={relatedEmails} />
        </div>

        {/* Sidebar Direita: Cliente e Pagamento */}
        <div className="space-y-4 md:space-y-6">
          <OrderCustomerCard order={order} />
          <OrderPaymentCard order={order} />
          <OrderAddressCard order={order} />
        </div>
      </div>
    </div>
  );
}