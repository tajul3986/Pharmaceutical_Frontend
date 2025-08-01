import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItems } from 'src/app/model/CartItems.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
product: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productIdString = this.route.snapshot.paramMap.get('id');
    if (productIdString) {
      const productId = Number(productIdString); // String থেকে Number কনভার্সন
      this.productService.getProductById(productId).subscribe((data) => {
        this.product = data;
      });
    }
  }

  // ngOnInit(): void {
  //   const productId = this.route.snapshot.paramMap.get('id');
  //   if (productId) {
  //     this.productService.getProductById(productId).subscribe((data) => {
  //       this.product = data;
  //     });
  //   }
  // }

  addToCart(): void {
    const cartItem: CartItems = {
      id: this.product.id,
      productId: this.product.id,
      userId: this.product.userId,
      name: this.product.productName,
      productCode: this.product.productCode,
      price: this.product.price,
      quantity: 1,
      totalPrice: this.product.price,
      image: this.product.mainImage,
    };

    this.cartService.addToCart(cartItem);

    Swal.fire({
      icon: 'success',
      title: 'Added to Cart',
      text: `"${this.product.productName}" has been added to your cart.`,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  buyNow(): void {
    this.addToCart();
    setTimeout(() => {
      this.router.navigate(['/delivery-information']);
    }, 1500);
  }

  showImageModal: boolean = false;

openImageModal() {
  this.showImageModal = true;
}

closeImageModal() {
  this.showImageModal = false;
}
}
