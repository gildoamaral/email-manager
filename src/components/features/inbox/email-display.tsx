"use client";

import { ArrowLeft } from "lucide-react";
import { Email } from "@/types";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/use-store";
import { EmailHeader } from "./email-header";
import { EmailThread } from "./email-thread";
import { EmailReplyEditor } from "./email-reply-editor";

interface EmailDisplayProps {
  email: Email | null;
  onBack?: () => void;
}

export function EmailDisplay({ email, onBack }: EmailDisplayProps) {
  const { markEmailAsRead } = useStore();

  if (!email) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Nenhum e-mail selecionado
      </div>
    );
  }

  // Efeito ao carregar o e-mail: Marcar como lido
  if (email.status === "new") {
    markEmailAsRead(email.id);
  }

  return (
    <div className="flex h-full flex-col">
      {/* Botão Voltar (apenas mobile) */}
      {onBack && (
        <div className="md:hidden p-2 border-b">
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
      <EmailHeader email={email} />
      <EmailThread email={email} />
      <Separator />
      <EmailReplyEditor email={email} />
    </div>
  );
}