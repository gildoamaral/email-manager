import { create } from 'zustand';
import { Email, Order, OrderStatus } from '@/types';
import emailsData from '@/data/emails.json';
import ordersData from '@/data/orders.json';

// Definindo o formato da nossa Store
interface AppState {
  emails: Email[];
  orders: Order[];
  
  // Actions (Ações que modificam o estado)
  markEmailAsRead: (id: string) => void;
  addReply: (emailId: string, content: string) => void;
  processRefund: (orderId: string, reason: string) => void;
  
  // Getters (Para pegar dados específicos facilmente)
  getEmailsByOrder: (orderId: string) => Email[];
  getOrderById: (orderId: string) => Order | undefined;
}

export const useStore = create<AppState>((set, get) => ({
  // Carrega os dados iniciais dos JSONs
  emails: emailsData as Email[], 
  orders: ordersData as Order[],

  markEmailAsRead: (id) => set((state) => ({
    emails: state.emails.map((email) => 
      email.id === id ? { ...email, status: 'read' } : email
    )
  })),

  addReply: (emailId, content) => set((state) => ({
    emails: state.emails.map((email) => {
      if (email.id !== emailId) return email;
      
      return {
        ...email,
        status: 'replied', // Muda status para respondido
        thread: [
          ...email.thread,
          {
            id: Math.random().toString(36).substr(2, 9), // ID temporário
            from: 'support',
            content,
            date: new Date().toISOString(),
            originalLanguage: 'pt'
          }
        ]
      };
    })
  })),

  processRefund: (orderId, reason) => set((state) => ({
    orders: state.orders.map((order) => 
      order.id === orderId 
        ? { ...order, status: 'refunded' as OrderStatus } // Atualiza status do pedido
        : order
    ),
    // Opcional: Poderíamos adicionar um log ou e-mail automático aqui também
  })),

  getEmailsByOrder: (orderId) => {
    return get().emails.filter((email) => email.orderId === orderId);
  },

  getOrderById: (orderId) => {
    return get().orders.find((order) => order.id === orderId);
  }
}));