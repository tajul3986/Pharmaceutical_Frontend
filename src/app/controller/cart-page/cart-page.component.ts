import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItems } from 'src/app/model/CartItems.model';
import { Product } from 'src/app/model/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  //product : Product[] = [];
  cartItems: CartItems[] = [];
  deliveryFee: number = 60;
  orderCode: string = '';
  product: any;


  constructor(private cartService: CartService, private router : Router) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
     console.log('Cart Items:', this.cartItems);
  }

  increaseQuantity(item: CartItems): void {
    item.quantity = (item.quantity || 0) + 1;
    item.totalPrice = (item.price || 0) * item.quantity;
    this.cartService.saveCartItems(this.cartItems);
  }

  decreaseQuantity(item: CartItems): void {
    if (item.quantity && item.quantity > 1) {
      item.quantity -= 1;
      item.totalPrice = (item.price || 0) * item.quantity;
      this.cartService.saveCartItems(this.cartItems);
    }
  }

  removeItem(item: CartItems): void {
    this.cartItems = this.cartItems.filter(
      (i) => i.productId !== item.productId
    );
    this.cartService.saveCartItems(this.cartItems);
  }

  getItemsTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + (item.totalPrice || 0),
      0
    );
  }

  getVAT(): number {
    return this.getItemsTotal() * 0.15;
  }

  getGrandTotal(): number {
    return this.getItemsTotal() + this.getVAT() + this.deliveryFee;
  }

  proceedToCheckout(): void {
    // alert('Proceeding to checkout...');
     this.router.navigate(['/delivery']);
  }

}
