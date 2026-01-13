"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Inbox, ShoppingBag, RotateCcw, Settings, Package2, LayoutDashboard } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ThemeToggle } from './mode-toggle';

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/inbox", label: "Inbox", icon: Inbox },
  { href: "/dashboard/orders", label: "Pedidos", icon: ShoppingBag },
  { href: "/dashboard/refunds", label: "Refunds", icon: RotateCcw },
  { href: "/dashboard/settings", label: "Configurações", icon: Settings },
];

export function AppHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-15 lg:px-6 justify-between">
      {/* Lado Esquerdo: Menu Mobile + Título */}
      <div className="flex items-center gap-4">
        {/* Menu Hambúrguer - Apenas Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <SheetHeader>
              <SheetTitle>
                <Link href="/dashboard" className="flex items-center gap-2 font-semibold" onClick={() => setOpen(false)}>
                  <Package2 className="h-6 w-6" />
                  <span>SaaS Manager</span>
                </Link>
              </SheetTitle>
            </SheetHeader>
            <nav className="grid gap-2 mt-6">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.href === "/dashboard" 
                  ? pathname === "/dashboard" 
                  : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
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
          </SheetContent>
        </Sheet>

        <h1 className="text-base sm:text-lg font-semibold md:text-xl">Confraria Vintage</h1>
      </div>

      {/* Lado Direito: Ações e Perfil */}
      <div className="flex items-center gap-2 sm:gap-4">
        <ThemeToggle />
        <Separator orientation="vertical" className="h-6 hidden sm:block" />
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium hidden sm:inline-block">
            Admin User
          </span>
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}