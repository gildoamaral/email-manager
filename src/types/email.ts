export type EmailStatus = 'new' | 'read' | 'replied';

export interface Email {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  preview: string; // Pequeno resumo para a lista
  date: string;
  status: EmailStatus;
  orderId?: string; // Chave estrangeira para ligar ao pedido (Opcional, pois pode ser dúvida geral)
  thread: EmailThread[]; // Histórico da conversa
}

export interface EmailThread {
  id: string;
  from: 'customer' | 'support'; // Quem enviou
  content: string; // O texto do e-mail
  date: string;
  originalLanguage?: 'en' | 'pt'; // Para a feature de tradução
}

export interface EmailProps {
  email: Email;
}

export interface EmailMessage {
  id: string;
  from: "customer" | "support";
  content: string;
  date: string;
  originalLanguage?: string;
}

export interface EmailMessageBubbleProps {
  message: EmailMessage;
  senderName: string;
}

export interface EmailListProps {
  items: Email[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export interface EmailDisplayProps {
  email: Email | null;
  onBack?: () => void;
}