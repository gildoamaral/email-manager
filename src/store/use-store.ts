import { create } from 'zustand';
import { Email, Order, OrderStatus } from '@/types';
import emailsData from '@/data/emails.json';
import ordersData from '@/data/orders.json';

interface AppState {
  emails: Email[];
  orders: Order[];
  
  markEmailAsRead: (id: string) => void;
  addReply: (emailId: string, content: string) => void;
  
  getEmailsByOrder: (orderId: string) => Email[];
  getOrderById: (orderId: string) => Order | undefined;
}

export const useStore = create<AppState>((set, get) => ({
  emails: emailsData as Email[], 
  orders: ordersData as Order[],

  markEmailAsRead: (id) => set((state) => ({
    emails: state.emails.map((email) => 
      email.id === id ? { ...email, status: 'read' } : email
    )
  })),

  // simulado
  addReply: (emailId, content) => set((state) => ({
    emails: state.emails.map((email) => {
      if (email.id !== emailId) return email;
      
      return {
        ...email,
        status: 'replied',
        thread: [
          ...email.thread,
          {
            id: Math.random().toString(36).substring(2, 11),
            from: 'support',
            content,
            date: new Date().toISOString(),
            originalLanguage: 'pt'
          }
        ]
      };
    })
  })),

  getEmailsByOrder: (orderId) => {
    return get().emails.filter((email) => email.orderId === orderId);
  },

  getOrderById: (orderId) => {
    return get().orders.find((order) => order.id === orderId);
  }
}));