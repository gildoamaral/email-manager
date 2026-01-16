"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Languages } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmailMessageBubbleProps } from '@/types';


export function EmailMessageBubble({ message, senderName }: EmailMessageBubbleProps) {
  const [showTranslated, setShowTranslated] = useState(false);
  const isCustomer = message.from === "customer";
  const canTranslate = message.originalLanguage === "en" && isCustomer;

  return (
    <div className={`flex ${isCustomer ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[80%] rounded-lg p-4 text-sm ${
          isCustomer
            ? "bg-muted/23 text-foreground"
            : "bg-blue-600 text-white dark:bg-blue-900"
        }`}
      >
        <div className="flex items-center justify-between mb-2 gap-4">
          <span className="font-bold text-xs opacity-70">
            {isCustomer ? senderName : "Suporte (Você)"}
          </span>
          {canTranslate && (
            <Button
              variant="ghost"
              size="sm"
              className="h-5 px-1 text-[10px] hover:bg-white/20"
              onClick={() => setShowTranslated(!showTranslated)}
            >
              <Languages className="mr-1 h-3 w-3" />
              {showTranslated ? "Ver Original" : "Traduzir p/ PT"}
            </Button>
          )}
        </div>

        {/* Conteúdo da Mensagem */}
        <div className="whitespace-pre-wrap leading-relaxed">
          {showTranslated && canTranslate
            ? `[TRADUÇÃO AUTOMÁTICA]\n${message.content} (Simulação de texto traduzido...)`
            : message.content}
        </div>

        <div className="text-[10px] text-right mt-2 opacity-60">
          {format(new Date(message.date), "HH:mm")}
        </div>
      </div>
    </div>
  );
}
