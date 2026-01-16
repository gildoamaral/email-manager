"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MoreVertical, Trash2, ChevronDown } from "lucide-react";

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
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="flex items-start justify-between px-4 py-2 border-b">
      <div className="flex gap-4 text-sm">
        <Avatar>
          <AvatarImage alt={email.senderName} />
          <AvatarFallback>{email.senderName[0]}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1 ">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setExpanded(!expanded)}>
            <span className="font-semibold">{email.senderName}</span>
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-0 h-4 w-4 flex items-center cursor-pointer justify-center hover:text-foreground/70 transition-transform"
              style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          {expanded && (
            <>
              <div className="line-clamp-1 text-xs">{email.subject}</div>
              <div className="line-clamp-1 text-xs text-muted-foreground">
                <span className="font-medium">Reply-To:</span> {email.senderEmail}
              </div>
            </>
          )}
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
