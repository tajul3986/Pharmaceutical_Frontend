import { Component, OnInit } from '@angular/core';
import { Seller } from 'src/app/model/seller.model';
import { SellerService } from 'src/app/services/seller.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
seller: Seller = {
    name: '',
    contactEmail: '',
    contactPhone: '',
    address: ''
  
  };

  sellers: Seller[] = [];

  constructor(private sellerService: SellerService) {}

  ngOnInit(): void {
    this.loadSellers();
    
  }

  loadSellers(): void {
    this.sellerService.getAll().subscribe(data => {
      this.sellers = data;
    });
  }

  addSeller(form: any): void {
    if (form.valid) {
      this.sellerService.create(this.seller).subscribe(() => {
        this.loadSellers();
        form.resetForm(); // reset ngForm
        this.seller = {
          name: '',
          contactEmail: '',
          contactPhone: '',
          address: ''
         
        };
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Seller Added",
        showConfirmButton: false,
        timer: 1500
      });
    }
    console.log("seller");
  }

  deleteSeller(id: number): void {
    this.sellerService.delete(id).subscribe(() => {
      this.loadSellers();
    });
  }


}
