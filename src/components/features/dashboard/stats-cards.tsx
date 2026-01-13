"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCardsProps } from '@/types';
import { Mail, RotateCcw, ShoppingBag } from "lucide-react";



export function StatsCards({ pendingEmails, monthlyRefunds, totalOrders }: StatsCardsProps) {
  return (
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
          <div className="text-2xl font-bold">{totalOrders}</div>
          <p className="text-xs text-muted-foreground">
            Pedidos registrados no sistema
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
