"use client";

import { useStore } from "@/store/use-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, RotateCcw, ShoppingBag } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  // Puxando dados da store global
  const { emails, orders } = useStore();

  // Calculando as métricas (KPIs)
  const pendingEmails = emails.filter(e => e.status === 'new').length;
  // Filtrando refunds (simples)
  const monthlyRefunds = orders.filter(o => o.status === 'refunded').length;
  // Pegando os 5 pedidos mais recentes
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold md:text-2xl">Dashboard</h1>
      </div>

      {/* Cards de Resumo (KPIs) */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">E-mails Pendentes</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingEmails}</div>
            <p className="text-xs text-muted-foreground">
              Mensagens não lidas na caixa de entrada
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refunds do Mês</CardTitle>
            <RotateCcw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyRefunds}</div>
            <p className="text-xs text-muted-foreground">
              Solicitações processadas este mês
            </p>
          </CardContent>
        </Card>

        <Card className="sm:col-span-2 md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
            <p className="text-xs text-muted-foreground">
              Pedidos registrados no sistema
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Pedidos Recentes (Resumo) */}
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base md:text-lg">Pedidos Recentes</CardTitle>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div className="font-medium text-sm">{order.customerName}</div>
                        <div className="text-xs text-muted-foreground hidden md:inline">
                          {order.customerEmail}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge 
                          variant={order.status === 'delivered' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col items-end">
                          <span className="font-medium text-sm">{order.currency} {order.amount.toFixed(2)}</span>
                          <Badge 
                            variant={order.status === 'delivered' ? 'default' : 'secondary'}
                            className="text-xs sm:hidden mt-1"
                          >
                            {order.status}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}