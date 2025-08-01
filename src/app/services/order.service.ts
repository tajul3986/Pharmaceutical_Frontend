import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../model/order.model';
import { Observable } from 'rxjs';
import { SalesSummary } from '../model/sales-summary.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:8080/pharma/orders';

  constructor(private http: HttpClient) {}

  
  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, order);
  }

  
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }

  
  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

   getSalesSummary(): Observable<SalesSummary> {
  return this.http.get<SalesSummary>('http://localhost:8080/pharma/sales-summary');
  }




  //with approval

  // createOrder(order: Order): Observable<Order> {
  //   return this.http.post<Order>(this.baseUrl, order);
  // }

  // getOrders(): Observable<Order[]> {
  //   return this.http.get<Order[]>(this.baseUrl);
  // }

  // deleteOrder(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.baseUrl}/${id}`);
  // }

  // checkOrderApproval(orderId: number): Observable<boolean> {
  //   return this.http.get<boolean>(`${this.baseUrl}/check-approval/${orderId}`);
  // }

  // approveOrder(orderId: number): Observable<string> {
  //   return this.http.put(`${this.baseUrl}/approve/${orderId}`, null, {
  //     responseType: 'text',
  //   });
  // }


 


}
