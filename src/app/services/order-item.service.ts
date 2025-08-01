import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderItem } from '../model/orderItem.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {
private Url = 'http://localhost:8080/api/order-items'; // API URL adjust করুন

  constructor(private http: HttpClient) { }

  getAll(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(this.Url);
  }

  getById(id: number): Observable<OrderItem> {
    return this.http.get<OrderItem>(`this.baseUrl/{id}`);
  }

  create(orderItem: OrderItem): Observable<OrderItem> {
    return this.http.post<OrderItem>(this.Url, orderItem);
  }

  update(id: number, orderItem: OrderItem): Observable<OrderItem> {
    return this.http.put<OrderItem>(`this.baseUrl/{id}`, orderItem);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`this.baseUrl/{id}`);
  }

}
