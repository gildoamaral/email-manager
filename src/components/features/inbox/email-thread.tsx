"use client";

import { EmailProps } from "@/types";
import { EmailMessageBubble } from "./email-message-bubble";



export function EmailThread({ email }: EmailProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-card">
      {email.thread.map((msg) => (
        <EmailMessageBubble
          key={msg.id}
          message={msg}
          senderName={email.senderName}
        />
      ))}
    </div>
  );
}
