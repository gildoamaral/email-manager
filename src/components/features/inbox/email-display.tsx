"use client";

import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { EmailDisplayProps } from "@/types";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/use-store";
import { EmailHeader } from "./email-header";
import { EmailThread } from "./email-thread";
import { EmailReplyEditor } from "./email-reply-editor";



export function EmailDisplay({ email, onBack }: EmailDisplayProps) {
  const { markEmailAsRead } = useStore();

  // Efeito ao carregar o e-mail: Marcar como lido
  useEffect(() => {
    if (email && email.status === "new") {
      markEmailAsRead(email.id);
    }
  }, [email, markEmailAsRead]);

  if (!email) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Nenhum e-mail selecionado
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Botão Voltar (apenas mobile) */}
      {onBack && (
        <div className="md:hidden p-2 border-b shrink-0">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </div>
      )}
      <div className="shrink-0">
        <EmailHeader email={email} />
      </div>
      <EmailThread email={email} />
      <Separator className="shrink-0" />
      <div className="shrink-0">
        <EmailReplyEditor email={email} />
      </div>
    </div>
  );
}