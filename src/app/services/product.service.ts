import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';
import { Category } from '../model/category.model';
import { Subcategory } from '../model/subcategory.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private apiUrl = 'http://localhost:8080/pharma/product'; // backend

  // private apiUrl = "http://localhost:3000/product";

  constructor(private http: HttpClient) {}


  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }


    getCategory(): Observable<Category[]> {
      return this.http.get<Category[]>("http://localhost:8080/pharma/category");
      // return this.http.get<Category[]>("http://localhost:3000/category");
    }

    getSubcategory(): Observable<Subcategory[]> {
      return this.http.get<Subcategory[]>("http://localhost:8080/pharma/subcategory");
      // return this.http.get<Subcategory[]>("http://localhost:3000/subcategory");
    }
    
  // read product
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }


getProductById(id: number): Observable<Product> {
  return this.http.get<Product>(`${this.apiUrl}/${id}`);
}

updateProduct(id: number, product: Product): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/${id}`, product);
}

 
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
