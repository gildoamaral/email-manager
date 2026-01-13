import { Refund } from './refund';

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'refunded' | 'cancelled';

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string; // Para cruzar dados se necessário
  customerPhone: string; // Telefone do cliente
  amount: number; // Valor em centavos ou float
  currency: string; // 'BRL' ou 'USD'
  status: OrderStatus;
  date: string;
  items: string[]; // Lista simples de produtos (ex: ["Camiseta Preta M"])
  payment: Payment; // Detalhes do pagamento
  address: Address; // Endereço de entrega
  refund?: Refund; // Dados do reembolso (opcional)
}

export interface Payment {
  id: string;
  method: string; 
  installments: number;
  amount: number;
}

export interface OrderProps {
  orders: Order[];
}