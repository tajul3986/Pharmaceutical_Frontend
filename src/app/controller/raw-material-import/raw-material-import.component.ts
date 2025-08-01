import { Component, OnInit } from '@angular/core';
import { RawMaterial } from 'src/app/model/raw.model';
import { RawMaterialImport } from 'src/app/model/rawimport.model';
import { Seller } from 'src/app/model/seller.model';
import { RawmaterialimportService } from 'src/app/services/rawmaterialimport.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-raw-material-import',
  templateUrl: './raw-material-import.component.html',
  styleUrls: ['./raw-material-import.component.css']
})
export class RawMaterialImportComponent implements OnInit {
rawi: any;


  importRecord: RawMaterialImport = {
    id: 0,
    sellerId: 0,
    materialId: 0,
    quantity: 0,
    unitPrice: 0,
    importDate: new Date(),
    totalPrice: undefined,
    sellerName: undefined,
    materialName: undefined
  };

  seller: Seller[] = [];
  materials: RawMaterial[] = [];
  importHistory: RawMaterialImport[] = [];
  importDate: any;

  constructor(private importService: RawmaterialimportService) {}

  ngOnInit(): void {
    this.loadSellers();
    this.loadMaterials();
    this.loadImportHistory();
  }

  loadSellers() {
    this.importService.getSellers().subscribe(data => this.seller = data);
  }

  loadMaterials() {
    this.importService.getMaterials().subscribe(data => this.materials = data);
  }

  loadImportHistory() {
    this.importService.getAllImports().subscribe(data => this.importHistory = data);
  }

  // calculateTotal(): number {
  //   return this.importRecord.quantity * this.importRecord.unitPrice;
  // }

  calculateTotal(): number {
  return (this.importRecord?.quantity ?? 0) * (this.importRecord?.unitPrice ?? 0);
}

  submitImport() {
    this.importRecord.totalPrice = this.calculateTotal();
    this.importRecord.importDate = this.importDate; // fix here
    this.importService.addImport(this.importRecord).subscribe(() => {
      this.loadImportHistory();
      this.importRecord = {
        id: 0,
        sellerId: 0,
        materialId: 0,
        sellerName: '',
        materialName: '',
        quantity: 0,
        unitPrice: 0,
        totalPrice: 0,
        importDate: new Date(),
        
      };
    });

    Swal.fire({
            position: "center",
            icon: "success",
            title: "Imported successful!",
            showConfirmButton: false,
            timer: 1500
          });

    // alert("Imported successful")

    console.log("Hi");
  }

//   submitImport() {
//   this.importRecord.totalPrice = this.calculateTotal();
//   this.importRecord.importDate = this.importDate; // fix here

//   this.importService.addImport(this.importRecord).subscribe(() => {
//     this.loadImportHistory();
//     this.importRecord = {
//       id: 0,
//       sellerId: 0,
//       materialId: 0,
//       sellerName: '',
//       materialName: '',
//       quantity: 0,
//       unitPrice: 0,
//       totalPrice: 0,
//       importDate: new Date()
//     };
//   });

//   alert("Imported successful");
// }


deleteImport(id: number | undefined): void {
  if (id === undefined) return;

  if (confirm('Are you sure you want to delete this import record?')) {
    this.importService.deleteImport(id).subscribe(() => {
      this.importHistory = this.importHistory.filter(record => record.id !== id);
    });
  }
}

formatDateToCustom(dateStr: string): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
  }

}
