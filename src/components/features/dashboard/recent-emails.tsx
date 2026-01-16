"use client";

import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Email } from "@/types";


const statusLabels: Record<string, string> = {
  new: "Novo",
  read: "Lido",
  replied: "Respondido",
};

const statusVariants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  new: "default",
  read: "outline",
  replied: "secondary",
};

export function RecentEmails({ emails }: {emails: Email[]}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base md:text-lg">E-mails Recentes</CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        <div className="divide-y divide-border">
          {emails.map((email) => (
            <div 
              key={email.id} 
              className="flex items-center justify-between gap-4 py-3 px-2 hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {email.orderId && (
                    <span className="font-semibold text-sm">
                      Pedido #{email.orderId.replace("ORD-", "")}
                    </span>
                  )}
                  {!email.orderId && (
                    <span className="font-semibold text-sm">
                      Sem pedido vinculado
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {email.senderName}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                  {formatDistanceToNow(new Date(email.date), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </span>
                <Badge 
                  variant={statusVariants[email.status] || "secondary"}
                  className="text-xs"
                >
                  {statusLabels[email.status] || email.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
