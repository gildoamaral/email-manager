"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MoreVertical, Trash2 } from "lucide-react";

import { EmailProps } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export function EmailHeader({ email }: EmailProps) {
  return (
    <div className="flex items-start justify-between p-4 border-b">
      <div className="flex items-start gap-4 text-sm">
        <Avatar>
          <AvatarImage alt={email.senderName} />
          <AvatarFallback>{email.senderName[0]}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <div className="font-semibold">{email.senderName}</div>
          <div className="line-clamp-1 text-xs">{email.subject}</div>
          <div className="line-clamp-1 text-xs text-muted-foreground">
            <span className="font-medium">Reply-To:</span> {email.senderEmail}
          </div>
        </div>
      </div>

      {/* Ações do Header */}
      <div className="flex items-center gap-2">
        {email.orderId && (
          <Badge variant="outline" className="hidden sm:flex">
            Pedido: {email.orderId}
          </Badge>
        )}
        <span className="text-xs text-muted-foreground">
          {format(new Date(email.date), "dd 'de' MMM, HH:mm", { locale: ptBR })}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Mais opções</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Marcar como não lida</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
