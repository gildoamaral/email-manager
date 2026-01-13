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