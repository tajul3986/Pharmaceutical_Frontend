import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {


//    product: Product = {
//     productCode:'',
//     name: '',
//     price: 0,
//     description: '',
//     category: '',
//     subcategory: '',
//     stock: 0,
//     image: ''
//   };

//   categories: any[] = [];
//   subcategories: any[] = [];

//   constructor(
//     private http : HttpClient,
//     private productService: ProductService,
//     private router: Router,
//     private categoryService: CategoryService,
//     private subcategoryService: SubcategoryService
//   ) {}

//   ngOnInit(): void {
//     console.log(localStorage.getItem("currentuser"));

//     this.categoryService.getCategories().subscribe(data => {
//       this.categories = data;
//     });

//     this.subcategoryService.getSubcategories().subscribe(data => {
//       this.subcategories = data;
//     });
//   }

//   // image upload :: start
//   public selectedFile: any;
//   public event1: any;
//   imgURL: any;
//   receivedImageData: any;
//   base64Data: any;
//   convertedImage: any;
  
//   public  onFileChanged(event: any) {
//     console.log(event);
//     this.selectedFile = event.target.files[0];
//     // Below part is used to display the selected image
//     let reader = new FileReader();
//     reader.readAsDataURL(event.target.files[0]);
//     reader.onload = (event2) => {
//       this.imgURL = reader.result;
//   };
//  }
//  onUpload() {
//   const uploadData = new FormData();
//   uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
//   this.http.post('http://localhost:8080/pharma/upload', uploadData)
//   .subscribe(res => {console.log(res);
//                        this.receivedImageData = res;
//                        this.base64Data = this.receivedImageData.pic;
//                        this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; },
//                err => console.log('Error Occured duringng saving: ' + err)
//             );
//  }
// // image upload :: end


//   //my first onSubmit
//   onSubmit(): void {

//     this.productService.createProduct(this.product).subscribe({
//       next: (res) => {
//         // alert('Medicine add successful');
//         Swal.fire({
//             // position: "top-end",
//             icon: "success",
//             title: "Madicine succesfully saved!",
//             showConfirmButton: false,
//             timer: 1500
//           });
//         this.router.navigate(['/admin/prolist']);
//       },
//       error: (err) => alert('Error: ' + err.message)
//     });
   
//   }



//image er jonno sobkichu eksathe dekhi kj hy kina

product : Product  = {
  productCode: '',
  name: '',
  price: 0,
  description: '',
  category: '',
  subcategory: '',
  stock: 0,
  image: '',
  quantity: 0
};

  categories: any[] = [];
  subcategories: any[] = [];

  selectedFile: File | null = null;
  imgURL: any;

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private router: Router,
    // Inject your services here if you have, otherwise remove
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService
  ) { }

  ngOnInit(): void {
    // Load categories and subcategories (adjust accordingly)
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });

    this.subcategoryService.getSubcategories().subscribe((data: any) => {
      this.subcategories = data;
    });
  }

  onFileChanged(event: any): void {
    this.selectedFile = event.target.files[0];

    // Preview image
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile as Blob);
    reader.onload = () => {
      this.imgURL = reader.result;
    };

    // Set filename in product for backend
    this.product.image = this.selectedFile?.name ?? '';
  }

  onSubmit(): void {
    if (!this.selectedFile) {
      alert('Please select an image file');
      return;
    }

    const formData = new FormData();

    // Append image file
    formData.append('image', this.selectedFile as Blob, this.selectedFile?.name);

    // Append product data as JSON Blob
    const productData = {
      productCode: this.product.productCode,
      name: this.product.name,
      price: this.product.price,
      description: this.product.description,
      category: this.product.category,
      subcategory: this.product.subcategory,
      stock: this.product.stock,
      image: this.product.image
    };

    formData.append('product', new Blob([JSON.stringify(productData)], { type: 'application/json' }));

    // Send POST request to backend
    this.http.post('http://localhost:8080/pharma/saveProductWithImage', formData)
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Medicine successfully saved!',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/admin/prolist']);
        },
        error: (err) => {
          alert('Error: ' + err.message);
        }
      });
  }

}
