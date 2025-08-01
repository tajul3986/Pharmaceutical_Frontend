import { Component, OnInit } from '@angular/core';
import { Inventory } from 'src/app/model/inventory.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
inventoryList: Inventory[] = [];

  ngOnInit(): void {
    // Dummy inventory data
    this.inventoryList = [
      { id: 1, productName: 'Paracetamol', location: 'Warehouse', quantity: 120, lastUpdated: '2025-07-07' },
      { id: 2, productName: 'Cetrizine', location: 'Store', quantity: 80, lastUpdated: '2025-07-06' },
      { id: 3, productName: 'Aspirin', location: 'Pharmacy', quantity: 25, lastUpdated: '2025-07-05' },
      { id: 4, productName: 'Vitamin C', location: 'Warehouse', quantity: 300, lastUpdated: '2025-07-03' },
      { id: 5, productName: 'Omeprazole', location: 'Store', quantity: 40, lastUpdated: '2025-07-01' }
    ];
  }

}
