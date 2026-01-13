import { formatDistanceToNow } from "date-fns"; // Vamos instalar isso rapidinho depois
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area"; // Componente nativo do Shadcn/Radix
import { Email } from "@/types";

interface EmailListProps {
  items: Email[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function EmailList({ items, selectedId, onSelect }: EmailListProps) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-4 border-b font-semibold text-sm text-muted-foreground shrink-0">
        Caixa de Entrada ({items.length})
      </div>
      <div className="flex-1 overflow-y-auto"> 
        <div className="flex flex-col gap-2 p-4">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={cn(
                "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                selectedId === item.id ? "bg-accent border-primary/50" : "bg-card"
              )}
            >
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{item.senderName}</span>
                    {item.status === "new" && (
                      <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDistanceToNow(new Date(item.date), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </span>
                </div>
                <div className="text-xs font-medium">{item.subject}</div>
              </div>
              <div className="line-clamp-2 text-xs text-muted-foreground">
                {item.thread[0]?.content.substring(0, 60)}...
              </div>
              <div className="flex items-center gap-2">
                {item.status === "replied" && (
                  <Badge variant="secondary" className="text-[10px] h-5 px-1">
                    Respondido
                  </Badge>
                )}
                {item.orderId && (
                  <Badge variant="outline" className="text-[10px] h-5 px-1">
                    {item.orderId}
                  </Badge>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}