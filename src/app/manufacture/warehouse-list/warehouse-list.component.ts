import { Component, OnInit } from '@angular/core';
import { Warehouse } from 'src/app/model/warehouse.model';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.css']
})
export class WarehouseListComponent implements OnInit {
warehouses: Warehouse[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private warehouseService: WarehouseService) {}

  ngOnInit(): void {
    this.loadWarehouses();
  }

  loadWarehouses(): void {
    this.warehouseService.getWarehouses().subscribe({
      next: (data) => {
        this.warehouses = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load warehouses';
        this.isLoading = false;
      }
    });
  }

  deleteWarehouse(id: number): void {
    if(confirm('Are you sure?')) {
      this.warehouseService.deleteWarehouse(id).subscribe({
        next: () => {
          this.warehouses = this.warehouses.filter(w => w.id !== id);
          alert('Warehouse deleted!');
        },
        error: (err) => alert('Error: ' + err.message)
      });
    }
  }

}
