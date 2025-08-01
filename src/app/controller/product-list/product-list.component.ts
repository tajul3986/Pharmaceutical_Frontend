import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private productService: ProductService,
    private http : HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Load all products
  loadProducts(): void {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load products';
        this.isLoading = false;
      }
    });
  }

  // Navigate to edit page with product ID
  editProduct(id: number | undefined): void {
    if (id === undefined) {
      console.error('Product ID is undefined');
      return;
    }
    this.router.navigate(['/admin/edit', id]);
  }

  // Delete product by ID
  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          // Remove product from list without reloading
          this.products = this.products.filter(p => p.id !== id);
          alert('Product deleted successfully.');
        },
        error: () => {
          alert('Failed to delete product.');
        }
      });
    }
  }
}
