// Tipos de Status para padronização visual (Badges)
export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'refunded' | 'cancelled';
export type EmailStatus = 'new' | 'read' | 'replied';

// Estrutura de um item da Thread de e-mail (para a visualização de conversa)
export interface EmailThread {
  id: string;
  from: 'customer' | 'support'; // Quem enviou
  content: string; // O texto do e-mail
  date: string;
  originalLanguage?: 'en' | 'pt'; // Para a feature de tradução
}

// O objeto principal de E-mail (Inbox)
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

// O objeto de Pedido
export interface Order {
  id: string;
  customerName: string;
  customerEmail: string; // Para cruzar dados se necessário
  amount: number; // Valor em centavos ou float
  currency: string; // 'BRL' ou 'USD'
  status: OrderStatus;
  date: string;
  items: string[]; // Lista simples de produtos (ex: ["Camiseta Preta M"])
}

// Estrutura para o formulário de Refund (usado no Zod depois)
export interface RefundFormData {
  orderId: string;
  reason: string; // Select: "Defeito", "Arrependimento", etc.
  items: string[]; // Checkboxes
  notes?: string;
}