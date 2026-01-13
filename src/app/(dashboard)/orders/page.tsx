"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Eye, ArrowUpDown, ArrowUp, ArrowDown, Filter } from "lucide-react";

import { useStore } from "@/store/use-store";
import { OrderStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type SortField = 'date' | 'amount';
type SortOrder = 'asc' | 'desc';

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pendente',
  paid: 'Pago',
  shipped: 'Enviado',
  delivered: 'Entregue',
  refunded: 'Reembolsado',
  cancelled: 'Cancelado'
};

// Componente de ícone de ordenação
function SortIcon({ field, sortField, sortOrder }: { field: SortField; sortField: SortField | null; sortOrder: SortOrder }) {
  if (sortField !== field) {
    return <ArrowUpDown className="ml-2 h-4 w-4 opacity-40" />;
  }
  return sortOrder === 'asc' 
    ? <ArrowUp className="ml-2 h-4 w-4" />
    : <ArrowDown className="ml-2 h-4 w-4" />;
}

export default function OrdersPage() {
  const router = useRouter();
  const { orders } = useStore();
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Se já está ordenando por esse campo, inverte a ordem
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Novo campo, começa com ascendente
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredAndSortedOrders = useMemo(() => {
    // Primeiro remove pedidos refunded
    const nonRefundedOrders = orders.filter(order => order.status !== 'refunded');
    
    // Depois filtra por status se necessário
    const result = statusFilter === 'all' 
      ? nonRefundedOrders 
      : nonRefundedOrders.filter(order => order.status === statusFilter);
    
    // Depois ordena se necessário
    if (!sortField) return result;

    return [...result].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [orders, sortField, sortOrder, statusFilter]);

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl font-semibold md:text-2xl">Pedidos</h1>
        
        {/* Filtro de Status */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as OrderStatus | 'all')}>
            <SelectTrigger className="w-full sm:w-45">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="paid">Pago</SelectItem>
              <SelectItem value="shipped">Enviado</SelectItem>
              <SelectItem value="delivered">Entregue</SelectItem>
              <SelectItem value="cancelled">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base md:text-lg">
            Todos os Pedidos ({filteredAndSortedOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-22.5 sm:w-25">ID</TableHead>
                  <TableHead className="hidden md:table-cell">
                    <Button 
                      variant="ghost" 
                      className="h-8 p-0 hover:bg-transparent"
                      onClick={() => handleSort('date')}
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
                      onClick={() => handleSort('amount')}
                    >
                      Total
                      <SortIcon field="amount" sortField={sortField} sortOrder={sortOrder} />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right w-17.5">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedOrders.map((order) => (
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
                        {/* Mostrar data em mobile */}
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
                        <span className="font-medium text-sm">{order.currency} {order.amount.toFixed(2)}</span>
                        {/* Mostrar status em mobile */}
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
                        className="h-8 w-8"
                        onClick={() => router.push(`/orders/${order.id}`)}
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
        </CardContent>
      </Card>
    </div>
  );
}
