import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Warehouse } from '../model/warehouse.model';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
private apiUrl = 'http://localhost:8080/api/warehouses';

  constructor(private http: HttpClient) { }

 getWarehouses(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(this.apiUrl);
  }

  createWarehouse(warehouse: Warehouse): Observable<Warehouse> {
    return this.http.post<Warehouse>(this.apiUrl, warehouse);
  }

  updateWarehouse(id: number, warehouse: Warehouse): Observable<Warehouse> {
    return this.http.put<Warehouse>(`${this.apiUrl}/${id}`, warehouse);
  }

  deleteWarehouse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getWarehouse(id: number): Observable<Warehouse> {
  return this.http.get<Warehouse>(`${this.apiUrl}/${id}`);
}
}
