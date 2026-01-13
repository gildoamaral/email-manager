"use client";

import { Email } from "@/types";
import { EmailMessageBubble } from "./email-message-bubble";

interface EmailThreadProps {
  email: Email;
}

export function EmailThread({ email }: EmailThreadProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
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
