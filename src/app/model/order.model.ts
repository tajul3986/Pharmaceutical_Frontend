export class OrderItem {
  id ?: number;
  name: string | undefined;
  quantity: number | undefined;
  price: number | undefined;
  orderDate?: string;
}


export enum OrderStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}



export class Order {
  id ?: number;
  orderCode?: string;
  date: Date | undefined;
  customerName: string | undefined;
  phone: string | undefined;
  paymentMethod?: 'cod' | 'card' | 'mobile';
  mobileType?: string | null;
  address: string | undefined;
  items: OrderItem[] | undefined;
  subtotal: number | undefined;
  vat: number | undefined;
  deliveryFee: number | undefined;
  total: number | undefined;
  // approved?: boolean;
  // status?: OrderStatus;
  
}
