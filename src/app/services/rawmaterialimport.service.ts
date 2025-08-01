import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seller } from '../model/seller.model';
import { RawMaterial } from '../model/raw.model';
import { RawMaterialImport } from '../model/rawimport.model';

@Injectable({
  providedIn: 'root'
})
export class RawmaterialimportService {

  private url = "http://localhost:8080/pharma/imports";
//  private url = "http://localhost:3000/imports";

  constructor(private http: HttpClient) {}

  getSellers(): Observable<Seller[]> {
    return this.http.get<Seller[]>("http://localhost:8080/pharma/seller");
    // return this.http.get<Seller[]>("http://localhost:3000/seller");
  }

  getMaterials(): Observable<RawMaterial[]> {
    return this.http.get<RawMaterial[]>("http://localhost:8080/pharma/rawmaterial");
    // return this.http.get<RawMaterial[]>("http://localhost:3000/raw");
  }

  getAllImports(): Observable<RawMaterialImport[]> {
    return this.http.get<RawMaterialImport[]>(this.url);
  }

  addImport(data: RawMaterialImport): Observable<any> {
    return this.http.post(this.url, data);
  }

  deleteImport(id: number): Observable<void> {
  return this.http.delete<void>(`${this.url}/${id}`);
}
}
