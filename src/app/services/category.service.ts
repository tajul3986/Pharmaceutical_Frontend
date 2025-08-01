import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../model/category.model';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private Url = "http://localhost:8080/pharma/category";
  
  // private Url = 'http://localhost:3000/category';


  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.Url);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.Url, category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.Url}/${id}`);
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.Url}/${id}`, category);
  }
 
  
}
