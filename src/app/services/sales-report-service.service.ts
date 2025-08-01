import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Order } from '../model/order.model';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class SalesReportServiceService {
private productUrl = 'http://localhost:8080/pharma/product';
  private orderUrl = 'http://localhost:8080/pharma/orders';

  constructor(private http: HttpClient) {}

  getSalesReportData(): Observable<any> {
    return forkJoin({
      products: this.http.get<Product[]>(this.productUrl),
      orders: this.http.get<Order[]>(this.orderUrl)
    });
  }
}
