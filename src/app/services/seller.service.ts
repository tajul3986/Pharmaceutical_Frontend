import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seller } from '../model/seller.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private url = 'http://localhost:8080/pharma/seller';
// private url = 'http://localhost:3000/seller';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Seller[]> {
    return this.http.get<Seller[]>(this.url);
  }

  create(seller: Seller): Observable<Seller> {
    return this.http.post<Seller>(this.url, seller);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

//   deleteImport(id: number): Observable<void> {
//   return this.http.delete<void>(`${this.url}/${id}`);
// }

}
