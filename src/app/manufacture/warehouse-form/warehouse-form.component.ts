import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-warehouse-form',
  templateUrl: './warehouse-form.component.html',
  styleUrls: ['./warehouse-form.component.css']
})
export class WarehouseFormComponent implements OnInit {
warehouseForm: FormGroup;
  isEditMode = false;
  warehouseId?: number;

  constructor(
    private fb: FormBuilder,
    private warehouseService: WarehouseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.warehouseForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
      description: [''],
      manager: [''],
      contactEmail: ['', [Validators.required, Validators.email]]
    });
    }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['id']) {
        this.isEditMode = true;
        this.warehouseId = +params['id'];
        this.loadWarehouseData(this.warehouseId);
      }
    });
  }

//   loadWarehouseData(id: number): void {
//   this.warehouseService.getWarehouse(id).subscribe({
//     next: (warehouse) => {
//       this.warehouseForm.patchValue(warehouse);
//     },
//     error: (err) => {
//       console.error('Error loading warehouse:', err);
//       alert('Warehouse not found!');
//       this.router.navigate(['/warehouses']);
//     }
//   });
// }

  loadWarehouseData(id: number): void {
    this.warehouseService.getWarehouse(id).subscribe(warehouse => {
      this.warehouseForm.patchValue(warehouse);
    });
  }

  onSubmit(): void {
    if(this.warehouseForm.valid) {
      const warehouseData = this.warehouseForm.value;
      
      if(this.isEditMode && this.warehouseId) {
        this.warehouseService.updateWarehouse(this.warehouseId, warehouseData)
          .subscribe(() => this.router.navigate(['/warehouses']));
      } else {
        this.warehouseService.createWarehouse(warehouseData)
          .subscribe(() => this.router.navigate(['/warehouses']));
      }
       }
  }

}
