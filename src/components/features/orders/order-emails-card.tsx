"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Email } from "@/types";

interface OrderEmailsCardProps {
  emails: Email[];
}

export function OrderEmailsCard({ emails }: OrderEmailsCardProps) {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
          <Mail className="h-4 w-4" />
          Comunicações Relacionadas
        </CardTitle>
      </CardHeader>
      <CardContent>
        {emails.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {emails.map((email) => (
              <div 
                key={email.id} 
                className="flex flex-col p-3 border rounded-lg bg-muted/20 cursor-pointer hover:bg-muted/40 transition-colors"
                onClick={() => router.push('/dashboard/inbox')}
              >
                <div className="flex justify-between items-start mb-1 gap-2">
                  <span className="font-semibold text-xs sm:text-sm flex-1">{email.subject}</span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {format(new Date(email.date), "dd/MM")}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {email.thread[0].content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-muted-foreground py-4">
            Nenhum e-mail vinculado a este pedido.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
