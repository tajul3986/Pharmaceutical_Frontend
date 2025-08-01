import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inventory } from '../model/inventory.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
private baseUrl = 'http://localhost:8080/pharma/inventory';

  constructor(private http: HttpClient) {}

  getInventory(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.baseUrl);
  }
}
