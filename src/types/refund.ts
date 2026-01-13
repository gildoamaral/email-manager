export type RefundStatus = 'pending' | 'approved' | 'rejected';

export interface Refund {
  id: string;
  status: RefundStatus;
  amount: number;
  date: string;
}

export interface RefundFormData {
  orderId: string;
  reason: string; // Select: "Defeito", "Arrependimento", etc.
  items: string[]; // Checkboxes
  notes?: string;
}

