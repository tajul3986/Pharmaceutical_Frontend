import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { Order, OrderStatus } from 'src/app/model/order.model';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delivery-information',
  templateUrl: './delivery-information.component.html',
  styleUrls: ['./delivery-information.component.css']
})
export class DeliveryInformationComponent implements OnInit {
  deliveryData = {
    name: '',
    phone: '',
    address: ''
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  proceedToPaymentMethod() {
    localStorage.setItem('deliveryInfo', JSON.stringify(this.deliveryData));
    this.router.navigate(['/order-summary']);
  }



  //with approval

  // deliveryData = {
  //   name: '',
  //   phone: '',
  //   address: '',
  // };

  // pollingSubscription!: Subscription;
  // latestOrderId!: number;

  // constructor(private router: Router, private orderService: OrderService) {}

  // ngOnInit(): void {}

  // proceedToPaymentMethod() {
  //   const order: Order = {
  //     customerName: this.deliveryData.name,
  //     phone: this.deliveryData.phone,
  //     address: this.deliveryData.address,
  //     date: new Date(),
  //     orderCode: 'ORD' + Date.now(),
  //     approved: false,
  //     status: OrderStatus.PENDING,
  //     items: [],
  //     subtotal: 0,
  //     vat: 0,
  //     deliveryFee: 0,
  //     total: 0,
  //     paymentMethod: undefined,
  //   };

  //   this.orderService.createOrder(order).subscribe({
  //     next: (savedOrder) => {
  //       this.latestOrderId = savedOrder.id!;
  //       console.log(savedOrder);
  //       // alert('🕓 Waiting for admin approval...');
  //       // Swal.fire("Please wait for the addmin approval!");

       
  //     Swal.fire({
  //       title: 'Wait for the admin approval',
  //       allowOutsideClick: false,
  //       showConfirmButton: false,
  //       icon: 'info',
  //       timer: 5000, // optional: alert will disappear after 3 seconds
  //     });


  //       this.startPollingApproval(this.latestOrderId);
  //     },
  //     error: (err) => {
  //       alert('❌ Error placing order');
  //       console.error(err);
  //     },
  //   });
  // }

  // startPollingApproval(orderId: number) {
  //   this.pollingSubscription = interval(5000).subscribe(() => {
  //     this.orderService.checkOrderApproval(orderId).subscribe((approved) => {
  //       if (approved) {
  //         alert('✅ Order Approved by Admin!');
  //         this.pollingSubscription.unsubscribe();
  //         this.router.navigate(['/payment']);
  //       }
  //     });
  //   });
  // }

  // ngOnDestroy(): void {
  //   if (this.pollingSubscription) {
  //     this.pollingSubscription.unsubscribe();
  //   }
  // }


}
