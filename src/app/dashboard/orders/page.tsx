"use client";

import { useState, useMemo } from "react";
import { useStore } from "@/store/use-store";
import { OrderStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrdersFilters, OrdersTable } from "@/components/features/orders";

type SortField = 'date' | 'amount';
type SortOrder = 'asc' | 'desc';

export default function OrdersPage() {
  const { orders } = useStore();
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredAndSortedOrders = useMemo(() => {
    const nonRefundedOrders = orders.filter(order => order.status !== 'refunded');
    
    const result = statusFilter === 'all' 
      ? nonRefundedOrders 
      : nonRefundedOrders.filter(order => order.status === statusFilter);
    
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
        <OrdersFilters statusFilter={statusFilter} onStatusChange={setStatusFilter} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base md:text-lg">
            Todos os Pedidos ({filteredAndSortedOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          <OrdersTable 
            orders={filteredAndSortedOrders}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={handleSort}
          />
        </CardContent>
      </Card>
    </div>
  );
}
