"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Eye, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
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
import { Order, OrderStatus } from "@/types";

type SortField = 'date' | 'amount';
type SortOrder = 'asc' | 'desc';

interface OrdersTableProps {
  orders: Order[];
  sortField: SortField | null;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pendente',
  paid: 'Pago',
  shipped: 'Enviado',
  delivered: 'Entregue',
  refunded: 'Reembolsado',
  cancelled: 'Cancelado'
};

function SortIcon({ field, sortField, sortOrder }: { field: SortField; sortField: SortField | null; sortOrder: SortOrder }) {
  if (sortField !== field) {
    return <ArrowUpDown className="ml-2 h-4 w-4 opacity-40" />;
  }
  return sortOrder === 'asc' 
    ? <ArrowUp className="ml-2 h-4 w-4" />
    : <ArrowDown className="ml-2 h-4 w-4" />;
}

export function OrdersTable({ orders, sortField, sortOrder, onSort }: OrdersTableProps) {
  const router = useRouter();

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-22.5 sm:w-25">ID</TableHead>
            <TableHead className="hidden md:table-cell">
              <Button 
                variant="ghost" 
                className="h-8 p-0 hover:bg-transparent"
                onClick={() => onSort('date')}
              >
                Data
                <SortIcon field="date" sortField={sortField} sortOrder={sortOrder} />
              </Button>
            </TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead className="hidden sm:table-cell">Status</TableHead>
            <TableHead className="text-right">
              <Button 
                variant="ghost" 
                className="h-8 p-0 hover:bg-transparent ml-auto flex"
                onClick={() => onSort('amount')}
              >
                Total
                <SortIcon field="amount" sortField={sortField} sortOrder={sortOrder} />
              </Button>
            </TableHead>
            <TableHead className="text-right w-17.5">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium text-xs sm:text-sm">{order.id}</TableCell>
              <TableCell className="hidden md:table-cell">
                {format(new Date(order.date), "dd/MM/yyyy", { locale: ptBR })}
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{order.customerName}</span>
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    {order.customerEmail}
                  </span>
                  <span className="text-xs text-muted-foreground md:hidden">
                    {format(new Date(order.date), "dd/MM/yy", { locale: ptBR })}
                  </span>
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge 
                  variant={
                    order.status === 'delivered' ? 'default' : 
                    order.status === 'refunded' ? 'destructive' : 'secondary'
                  }
                  className="text-xs"
                >
                  {STATUS_LABELS[order.status]}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex flex-col items-end">
                  <span className="font-medium text-sm">R$ {order.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                  <Badge 
                    variant={
                      order.status === 'delivered' ? 'default' : 
                      order.status === 'refunded' ? 'destructive' : 'secondary'
                    }
                    className="text-xs sm:hidden mt-1"
                  >
                    {STATUS_LABELS[order.status]}
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 cursor-pointer"
                  onClick={() => router.push(`/dashboard/orders/${order.id}`)}
                >
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">Ver detalhes</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
