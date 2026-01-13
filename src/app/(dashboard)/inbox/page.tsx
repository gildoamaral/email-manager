"use client";

import { useState } from "react";
import { useStore } from "@/store/use-store";
import { cn } from "@/lib/utils";
import { EmailList } from "@/components/features/inbox/email-list";
import { EmailDisplay } from "@/components/features/inbox/email-display";

export default function InboxPage() {
  const { emails } = useStore();
  
  // Estado local para saber qual e-mail está selecionado na tela dividida
  // Por padrão, selecionamos o primeiro da lista, se existir
  const [selectedId, setSelectedId] = useState<string | null>(
    emails.length > 0 ? emails[0].id : null
  );
  
  // Estado para controlar visualização no mobile
  const [isViewingEmail, setIsViewingEmail] = useState(false);

  const selectedEmail = emails.find((e) => e.id === selectedId) || null;
  
  const handleSelectEmail = (id: string) => {
    setSelectedId(id);
    setIsViewingEmail(true);
  };
  
  const handleBackToList = () => {
    setIsViewingEmail(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-140px)] border rounded-lg overflow-hidden bg-background shadow-sm">
      
      {/* Coluna da Esquerda: Lista */}
      <div className={cn(
        "w-full md:w-[320px] border-b md:border-b-0 md:border-r bg-muted/10",
        isViewingEmail ? "hidden md:block" : "block"
      )}>
        <EmailList 
          items={emails} 
          selectedId={selectedId} 
          onSelect={handleSelectEmail} 
        />
      </div>

      {/* Coluna da Direita: Visualização */}
      <div className={cn(
        "flex-1 bg-background",
        isViewingEmail ? "block" : "hidden md:block"
      )}>
        <EmailDisplay 
          email={selectedEmail} 
          onBack={handleBackToList}
        />
      </div>
      
    </div>
  );
}