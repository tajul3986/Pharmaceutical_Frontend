import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subcategory } from '../model/subcategory.model';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
       private Url = 'http://localhost:8080/pharma/subcategory';
    // private Url = 'http://localhost:3000/subcategory';

  constructor(private http: HttpClient) {}

  getSubcategories(): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(this.Url);
  }

  addSubcategory(subcategory: Subcategory): Observable<Subcategory> {
    return this.http.post<Subcategory>(this.Url, subcategory);
  }

  updateSubcategory(id: number, subcategory: Subcategory): Observable<any> {
    return this.http.put(`${this.Url}/${id}`, subcategory);
  }

  deleteSubcategory(id: number): Observable<any> {
    return this.http.delete(`${this.Url}/${id}`);
  }
}
