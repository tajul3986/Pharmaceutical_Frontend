import { Injectable } from '@angular/core';
import { CartItems } from '../model/CartItems.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

 

  private cartKey = 'cartItems';
  private baseUrl = 'http://localhost:8080/pharma/cartItems';

  constructor(private http: HttpClient) {}

  // 🔹 Cart Count Subject
  private cartItemCountSubject = new BehaviorSubject<number>(this.getCartItemCount());
 getCartItemCountObservable(): Observable<number> {
  return this.cartItemCountSubject.asObservable();
}
private updateCartItemCount(): void {
  this.cartItemCountSubject.next(this.getCartItemCount());
}



   getDeliveryFee(): number {
  return 40; 
}
  getVAT(): number {
  const subtotal = this.getSubtotal();
  return subtotal * 0.15; 
}

  getSubtotal(): number {
  const items = this.getCartItems(); 
  return items.reduce((total, item) => {
    const price = item.price || 0;
    const qty = item.quantity || 0;
    return total + price * qty;
  }, 0);
}

  getCartItems(): CartItems[] {
    const data = localStorage.getItem(this.cartKey);
    return data ? JSON.parse(data) : [];
  }

  saveCartItems(items: CartItems[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(items));
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }

  getCartTotal(): number {
    return this.getCartItems().reduce(
      (sum, item) => sum + (item.totalPrice || 0),
      0
    );
  }

  addToCart(product: CartItems): void {
    const cart = this.getCartItems();
    const existingItem = cart.find(
      (item) => item.productId === product.productId
    );

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity ?? 0) + 1;
      existingItem.totalPrice =
        (existingItem.price ?? 0) * existingItem.quantity;
      this.updateCartItem(existingItem);
    } else {
      product.quantity = 1;
      product.totalPrice = product.price ?? 0;
      cart.push(product);
      this.http.post(`${this.baseUrl}/`, product).subscribe({
        next: (res: any) => {
          product.id = res.id;
          this.saveCartItems(cart);
        },
        error: (err) => {
          console.error('Error saving to backend:', err);
        },
      });
    }

    this.saveCartItems(cart);

    this.updateCartItemCount(); //new add
  }

  updateCartItem(cartItem: CartItems): void {
    // Local Update
    const cart = this.getCartItems();
    const index = cart.findIndex(
      (item) => item.productId === cartItem.productId
    );
    if (index !== -1) {
      cart[index] = cartItem;
      this.saveCartItems(cart);
    }

   
    // Backend Update
    this.http.put(`${this.baseUrl}/${cartItem.id}`, cartItem).subscribe({
      next: () => console.log('Cart item updated on backend'),
      error: (err) => console.error('Error updating backend cart:', err),
    });
  }

  getCartItemCount(): number {
    return this.getCartItems().reduce(
      (count, item) => count + (item.quantity ?? 0),
      0
    );
  }

  removeFromCart(productId: number): void {
    
    const updatedCart = this.getCartItems().filter(
      (item) => item.productId !== productId
    );
    this.saveCartItems(updatedCart);

    
    this.http.delete(`http://localhost:8080/cartItems/${productId}`).subscribe({
      next: () => console.log('Deleted from backend'),
      error: (err) => console.error('Error deleting from backend:', err),
    });
  }

}
