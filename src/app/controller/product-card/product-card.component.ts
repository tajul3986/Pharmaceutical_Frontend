import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItems } from 'src/app/model/CartItems.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
//import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
products: any[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error loading products:', err);
      }
    });
  }

  createCartItem(product: any): CartItems {
  return {
    id: product.id,
    productId: product.id,
    userId: product.userId,
    name: product.name,
    productCode: product.productCode,
    price: product.price,
    quantity: 1,
    totalPrice: product.price,
    image: product.image
  };
}

addToCart(product: any): void {
  const cartItem = this.createCartItem(product);
  this.cartService.addToCart(cartItem);
  //alert(`${product.name} added to cart!`);

  Swal.fire({
  position: "center",
  icon: "success",
  title: "Added to cart",
  showConfirmButton: false,
  timer: 800
});

}

buyNow(product: any): void {
  const cartItem = this.createCartItem(product);
  this.cartService.addToCart(cartItem);
  this.router.navigate(['/delivery']);
}

  // buyNow(productId: number): void {

    
  //   // Navigate to product detail page (to be implemented)
  //   this.router.navigate(['/delivery']);

  // }

  // addToCart(product: any): void {
    // const cartItem: CartItems = {
    //   id: product.id,
    //   productId: product.id,
    //   userId: product.userId,
    //   name: product.name,
    //   productCode: product.productCode,
    //   price: product.price,
    //   quantity: 1,
    //   totalPrice: product.price,
    //   mainImage: product.mainImage
    // };

    // this.cartService.addToCart(cartItem);
  //   alert(`${product.name} added to cart!`);
  // }




// order proccessing

// products: any[] = [];

//   constructor(
//     private productService: ProductService,
//     private cartService: CartService,
//     private userService: UserService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.loadProducts();
//   }

//   loadProducts(): void {
//     this.productService.getAllProducts().subscribe({
//       next: (data) => {
//         this.products = data;
//       },
//       error: (err) => {
//         console.error('Error loading products:', err);
//       }
//     });
//   }

//   addToCart(product: any): void {
//     if (!this.userService.isLoggedIn()) {
//       alert('Please login to add products to cart.');
//       this.router.navigate(['/login']);
//       return;
//     }

//     const cartItem: CartItems = {
//       id: product.id,
//       productId: product.id,
//       userId: this.getUserId(), // added userId logic
//       name: product.name,
//       productCode: product.productCode,
//       price: product.price,
//       quantity: 1,
//       totalPrice: product.price,
//       mainImage: product.mainImage
//     };

//     this.cartService.addToCart(cartItem);
//     alert(`${product.productName} added to cart!`);
//   }

//   buyNow(product: any): void {
//     if (!this.userService.isLoggedIn()) {
//       alert('Please login to continue with purchase.');
//       this.router.navigate(['/login']);
//       return;
//     }

//     // Navigate to payment page with product info (you need to build payment page)
//     this.router.navigate(['/payment'], { queryParams: { productId: product.id } });
//   }

//   getUserId(): number {
//     const userData = localStorage.getItem("loginUser");
//     if (userData) {
//       const user = JSON.parse(userData);
//       return user.id;
//     }
//     return 0;
//   }


}
