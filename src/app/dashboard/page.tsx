"use client";

import { useStore } from "@/store/use-store";
import { StatsCards, RecentOrders, RecentEmails } from "@/components/features/dashboard";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const { emails, orders } = useStore();

  const pendingEmails = emails.filter(e => e.status === 'new').length;
  const monthlyRefunds = orders.filter(o => o.status === 'refunded').length;
  
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const recentEmails = [...emails]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const chartData = [
    { name: "E-mails Pendentes", shortName: "E-mails", value: pendingEmails, color: "#3b82f6" },
    { name: "Refunds do Mês", shortName: "Refunds", value: monthlyRefunds, color: "#ef4444" },
    { name: "Total de Pedidos", shortName: "Pedidos", value: orders.length, color: "#10b981" },
  ];

  return (
    <div className="flex flex-col gap-4 md:gap-6 w-full">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold md:text-2xl">Dashboard</h1>
      </div>

      {/* Gráfico de Pizza */}
      <Card>
        <CardHeader>
          <CardTitle>Visão Geral</CardTitle>
        </CardHeader>
        <CardContent>

          <ResponsiveContainer width="100%"  height={300} >
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ payload, percent = 0 }) => `${payload?.shortName}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                style={{ outline: 'none' }}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip isAnimationActive={false}/>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          
        </CardContent>
      </Card>

      {/* Cards de Resumo (KPIs) */}
      <StatsCards 
        pendingEmails={pendingEmails}
        monthlyRefunds={monthlyRefunds}
        totalOrders={orders.length}
      />

      {/* Grid de Pedidos e E-mails Recentes */}
      <div className="grid gap-4 md:grid-cols-2">
        <RecentOrders orders={recentOrders} />
        <RecentEmails emails={recentEmails} />
      </div>
    </div>
  );
}