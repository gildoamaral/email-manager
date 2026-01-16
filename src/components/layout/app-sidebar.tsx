"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Inbox, ShoppingBag, RotateCcw, Settings, Package2, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/inbox", label: "Inbox", icon: Inbox },
  { href: "/dashboard/orders", label: "Pedidos", icon: ShoppingBag },
  { href: "/dashboard/refunds", label: "Refunds", icon: RotateCcw },
  { href: "/dashboard/settings", label: "Configurações", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-muted/40 hidden md:block sticky top-0 h-screen overflow-y-auto">

      <nav className="grid items-start px-2 text-sm font-medium lg:px-4 mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          // Verifica se a rota atual é exatamente "/dashboard" para Dashboard, ou começa com o href para outras
          const isActive = item.href === "/dashboard" 
            ? pathname === "/dashboard" 
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                isActive
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}