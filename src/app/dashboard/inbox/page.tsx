"use client";

import { useState } from "react";
import { useStore } from "@/store/use-store";
import { cn } from "@/lib/utils";
import { EmailList } from "@/components/features/inbox/email-list";
import { EmailDisplay } from "@/components/features/inbox/email-display";

export default function InboxPage() {
  const { emails } = useStore();
  
  const [selectedId, setSelectedId] = useState<string | null>(
    emails.length > 0 ? emails[0].id : null
  );
  
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
    <div className="flex flex-col md:flex-row h-[calc(100vh-140px)] border rounded-lg overflow-hidden bg-card shadow-sm">
      
      <div className={cn(
        "w-full md:w-[320px] border-b md:border-b-0 md:border-r bg-muted/30 overflow-hidden",
        isViewingEmail ? "hidden md:block" : "flex flex-col"
      )}>
        <EmailList 
          items={emails} 
          selectedId={selectedId} 
          onSelect={handleSelectEmail} 
        />
      </div>

      <div className={cn(
        "flex-1 bg-card overflow-hidden",
        isViewingEmail ? "flex flex-col" : "hidden md:flex md:flex-col"
      )}>
        <EmailDisplay 
          email={selectedEmail} 
          onBack={handleBackToList}
        />
      </div>
      
    </div>
  );
}