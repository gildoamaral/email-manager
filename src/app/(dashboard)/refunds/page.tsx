"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ExternalLink, AlertCircle } from "lucide-react";

import { useStore } from "@/store/use-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefundStatus } from "@/types";

export default function RefundsPage() {
  const router = useRouter();
  const { orders } = useStore();

  // Filtra apenas pedidos que possuem o objeto refund populado
  // (Isso pega tanto os do JSON mockado quanto os criados dinamicamente na store)
  const refundedOrders = orders.filter((order) => order.refund !== undefined);

  const getStatusColor = (status: RefundStatus) => {
    switch (status) {
      case "approved": return "default"; // Preto/Slate (Padrão Shadcn)
      case "pending": return "secondary"; // Cinza claro
      case "rejected": return "destructive"; // Vermelho
      default: return "outline";
    }
  };

  const getStatusLabel = (status: RefundStatus) => {
    switch (status) {
      case "approved": return "Aprovado";
      case "pending": return "Pendente";
      case "rejected": return "Rejeitado";
      default: return status;
    }
  };

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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Refund ID</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Pedido Original</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Valor Estornado</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {refundedOrders.map((order) => (
                  <TableRow key={order.refund!.id}>
                    <TableCell className="font-medium text-xs font-mono">
                      {order.refund!.id}
                    </TableCell>
                    <TableCell>
                      {format(new Date(order.refund!.date), "dd/MM/yyyy HH:mm", {
                        locale: ptBR,
                      })}
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-muted-foreground">
                        {order.id}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{order.customerName}</span>
                        <span className="text-xs text-muted-foreground">
                          {order.customerEmail}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(order.refund!.status)}>
                        {getStatusLabel(order.refund!.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium text-red-600 dark:text-red-400">
                      - {order.currency} {order.refund!.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push(`/orders/${order.id}`)}
                        title="Ver detalhes do pedido"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">Ver pedido</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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