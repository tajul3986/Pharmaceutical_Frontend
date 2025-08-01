import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
reportTitle = 'Sales Report - June 2025';

  reportData = [
    { product: 'Paracetamol', quantity: 50, price: 5 },
    { product: 'Napa Extra', quantity: 30, price: 8 },
    { product: 'Seclo ', quantity: 20, price: 6 },
    { product: 'Maxpro-20', quantity: 20, price: 8 },
    { product: 'Folison ', quantity: 60, price: 12 },
    { product: 'Rupadin ', quantity: 30, price: 8},
    { product: 'Sonexa-4 ', quantity: 40, price: 50 },
    { product: 'Zyril ', quantity: 80, price: 20 },
    { product: 'Napa ', quantity: 140, price: 50 },
    { product: 'Saline ', quantity: 400, price: 8 },
    { product: 'Famotec ', quantity: 78, price: 30 },
    { product: 'Rolack ', quantity: 230, price: 15 },
  ];
today: string | number | Date | undefined;

  get totalAmount(): number {
    return this.reportData.reduce((sum, item) => sum + item.quantity * item.price, 0);
  }

  constructor() {}

  ngOnInit(): void {}
}
