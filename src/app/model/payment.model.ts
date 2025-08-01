export class PaymentInfo {
  id?: number;

  paymentMethod?: 'mobile' | 'card' | 'cod';

  // Mobile Banking
  mobileType?: 'bKash' | 'Nagad' | 'Rocket';
  mobileNumber?: string;
  transactionId?: string;

  // Card Payment
  fullName?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
}