import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  // constructor() { }

  // ngOnInit(): void {
  // }

productForm!: FormGroup;
  productId!: number;
  isLoading = false;
  errorMessage = '';

  categories: any[] = [];
  subcategories: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productCode: [''],
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: [''],
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
      image: ['']
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.productId = +idParam;
      this.loadProduct();
    }

    this.loadCategories();
    this.loadSubcategories();
  }

  loadProduct(): void {
    this.isLoading = true;
    this.productService.getProductById(this.productId).subscribe({
      next: (product) => {
        this.productForm.patchValue(product);
        
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load product';
        this.isLoading = false;
      }
    });
  }

  loadCategories(): void {
    this.productService.getCategory().subscribe(data => {
      this.categories = data;
    });
  }

  loadSubcategories(): void {
    this.productService.getSubcategory().subscribe(data => {
      this.subcategories = data;
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    const updatedProduct: Product = {
      ...this.productForm.value,
      id: this.productId
    };

    this.productService.updateProduct(this.productId, updatedProduct).subscribe({
      next: () => {
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
              Swal.fire("Changes are not saved", "", "info");
            }
          });
        // alert('Product updated successfully!');
        this.router.navigate(['/admin/prolist']);
      },
      error: () => {
        alert('Failed to update product');
      }
    });
  }

}
