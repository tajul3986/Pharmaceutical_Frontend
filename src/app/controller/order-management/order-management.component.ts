import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  // orders: Order[] = [];

  // constructor(private orderService: OrderService) {}

  // ngOnInit(): void {
  //   this.loadOrders();
  // }

  // loadOrders(): void {
  //   this.orderService.getOrders().subscribe({
  //     next: (data) => (this.orders = data),
  //     error: (err) => console.error('Error loading orders', err),
  //   });
  // }

  // deleteOrder(id: number): void {
  //   this.orderService.deleteOrder(id).subscribe(() => {
  //     this.orders = this.orders.filter((o) => o.id !== id);
  //   });
  // }

  // getTotalItems(order: Order): number {
  //   if (!order.items) return 0;
  //   return order.items.reduce((total, item) => total + (item.quantity || 0), 0);
  // }

  // approveOrder(order: Order): void {
  //   order.status = 'APPROVED';
  //   this.orderService.updateOrder(order).subscribe(() => {
  //     this.loadOrders();
  //   });
  // }

  // rejectOrder(order: Order): void {
  //   order.status = 'REJECTED';
  //   this.orderService.updateOrder(order).subscribe(() => {
  //     this.loadOrders();
  //   });
  // }

  //with approval

  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (data) => (this.orders = data),
      error: (err) => console.error('Error loading orders', err),
    });
  }

  deleteOrder(id: number): void {
    this.orderService.deleteOrder(id).subscribe(() => {
      this.orders = this.orders.filter((o) => o.id !== id);
    });
  }

  // approveOrder(id: number): void {
  //   this.orderService.approveOrder(id).subscribe(() => {
  //     alert('✅ Order approved');
  //     this.loadOrders();
  //   });
  // }

  getTotalItems(order: Order): number {
    if (!order.items) return 0;
    return order.items.reduce((total, item) => total + (item.quantity || 0), 0);
  }



}
