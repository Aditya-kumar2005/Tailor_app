export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  // address: string;
  isDeleted?: boolean;
}

export interface Order {
  id: number;
  customerName: string; 
  orderDate: string;
  totalAmount: number;
  status: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface Staff {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export interface Tailor {
  id: number;
  customerId: number;
  garment?: string;
  garmentType?: string;
  chest?: number;
  waist?: number;
  sleeve?: number;
  length?: number;
  price?: number;
  notes?: string;
  customerName?: string;
}


export interface InventoryItem {
  id: number;
  name: string;
  type: string;
  stock: number;
}

export interface Payment {
  id: number;
  orderId: number;
  amount: number;
  status: "Paid" | "Pending" | "Partial";
  method: "Cash" | "Card" | "Digital";
  date: string;
}
