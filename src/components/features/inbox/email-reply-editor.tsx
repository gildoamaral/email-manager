"use client";

import { useState } from "react";
import { Send, Languages, Loader2, X } from "lucide-react";

import { EmailProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/store/use-store";
import { toast } from "sonner";



export function EmailReplyEditor({ email }: EmailProps) {
  const { addReply } = useStore();
  const [replyText, setReplyText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedText, setTranslatedText] = useState("");

  const handleTranslate = () => {
    if (!replyText.trim()) return;

    setIsTranslating(true);
    setTranslatedText("");

    // Simulação de tradução com delay de 1 segundo
    setTimeout(() => {
      const mockEnglishTranslation = `(Translated to EN): ${replyText}`;
      setTranslatedText(mockEnglishTranslation);
      setIsTranslating(false);
    }, 1000);
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;

    // Envia a versão traduzida se existir, caso contrário envia o original
    const textToSend = translatedText.trim() || replyText;
    
    addReply(email.id, textToSend);
    setReplyText("");
    setTranslatedText("");
    toast.success("Resposta enviada com sucesso!");
  };

  return (
    <div className="p-4 bg-card">
      <div className="grid gap-4">
        <Textarea
          className="p-4 min-h-25"
          placeholder="Digite sua resposta em português..."
          value={replyText}
          onChange={(e) => {
            setReplyText(e.target.value);
            setTranslatedText(""); // Limpa a tradução ao editar
          }}
        />

        {/* Preview da tradução */}
        {translatedText && (
          <div className="bg-muted p-3 rounded-md text-sm relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6"
              onClick={() => setTranslatedText("")}
            >
              <X className="h-3 w-3" />
            </Button>
            <p className="text-muted-foreground text-xs mb-1">
              Será enviado como:
            </p>
            <p className="text-foreground pr-8">{translatedText}</p>
          </div>
        )}

        <div className="flex items-center justify-end gap-2">
          <Button
            onClick={handleTranslate}
            disabled={!replyText.trim() || isTranslating}
            variant="outline"
          >
            {isTranslating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Traduzindo...
              </>
            ) : (
              <>
                <Languages className="mr-2 h-4 w-4" />
                Traduzir
              </>
            )}
          </Button>

          <Button
            onClick={handleSendReply}
            disabled={!replyText.trim()}
          >
            <Send className="mr-2 h-4 w-4" />
            Enviar Resposta
          </Button>
        </div>
      </div>
    </div>
  );
}
