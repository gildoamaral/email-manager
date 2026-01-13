"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ExternalLink } from "lucide-react";
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
import { Order, RefundStatus } from "@/types";

interface RefundsTableProps {
  orders: Order[];
}

const STATUS_COLORS: Record<RefundStatus, "default" | "secondary" | "destructive" | "outline"> = {
  approved: "default",
  pending: "secondary",
  rejected: "destructive",
};

const STATUS_LABELS: Record<RefundStatus, string> = {
  approved: "Aprovado",
  pending: "Pendente",
  rejected: "Rejeitado",
};

export function RefundsTable({ orders }: RefundsTableProps) {
  const router = useRouter();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-30">Refund ID</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Pedido Original</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Valor Estornado</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
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
              <Badge variant={STATUS_COLORS[order.refund!.status]}>
                {STATUS_LABELS[order.refund!.status]}
              </Badge>
            </TableCell>
            <TableCell className="text-right font-medium">
              R$ {order.refund!.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push(`/dashboard/orders/${order.id}`)}
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
  );
}
