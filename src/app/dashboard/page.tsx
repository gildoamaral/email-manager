"use client";

import { useStore } from "@/store/use-store";
import { StatsCards, RecentOrders, RecentEmails } from "@/components/features/dashboard";

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

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold md:text-2xl">Dashboard</h1>
      </div>

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