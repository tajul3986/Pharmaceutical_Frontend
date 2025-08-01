import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentInfo } from '../model/payment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
//private apiUrl = 'http://localhost:8080/pharma/payment'; // Replace with your actual backend URL
private apiUrl = 'http://localhost:3000/payment';

  constructor(private http: HttpClient) {}

  savePayment(payment: PaymentInfo): Observable<PaymentInfo> {
    return this.http.post<PaymentInfo>(this.apiUrl, payment);
  }

  getPayments(): Observable<PaymentInfo[]> {
    return this.http.get<PaymentInfo[]>(this.apiUrl);
  }

  getPaymentById(id: number): Observable<PaymentInfo> {
    return this.http.get<PaymentInfo>(`${this.apiUrl}/${id}`);
  }
}
