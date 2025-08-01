export interface SalesItemDetail {
  name: string;
  quantity: number;
  price: number;
  total: number;
  date: string;
  time: string;
}




import { Component, OnInit } from '@angular/core';
import { Order, OrderItem } from 'src/app/model/order.model';
import { SalesReportServiceService } from 'src/app/services/sales-report-service.service';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {

    todaySales: number = 0;
    monthlySales: number = 0;
    yearlySales: number = 0;

  topSellingMedicines: { name: string; quantitySold: number }[] = [];

  detailedTodayList: SalesItemDetail[] = [];
  detailedMonthlyList: SalesItemDetail[] = [];
  detailedYearlyList: SalesItemDetail[] = [];

  // 🔍 Search support
  filteredMonthlyList: SalesItemDetail[] = [];
  filteredYearlyList: SalesItemDetail[] = [];

  monthlySearch: string = '';
  yearlySearch: string = '';

  constructor(private salesReportService: SalesReportServiceService) {}

  ngOnInit(): void {
    this.salesReportService.getSalesReportData().subscribe(({ orders }) => {
      const allItems = orders.flatMap((order: Order) =>
        (order.items || []).map(item => ({
          ...item,
          orderDate: order.date?.toString()
        }))
      );

      this.todaySales = this.calculateSales(allItems, 'day');
      this.monthlySales = this.calculateSales(allItems, 'month');
      this.yearlySales = this.calculateSales(allItems, 'year');

      // Top Selling
      const salesMap = new Map<string, number>();
      allItems.forEach((item: { name: string; quantity: number; }) => {
        if (item.name) {
          const quantity = item.quantity ?? 0;
          salesMap.set(item.name, (salesMap.get(item.name) || 0) + quantity);
        }
      });

      this.topSellingMedicines = Array.from(salesMap.entries())
        .map(([name, quantitySold]) => ({ name, quantitySold }))
        .sort((a, b) => b.quantitySold - a.quantitySold)
        .slice(0, 5);

      // Detailed
      this.detailedTodayList = this.groupDetailedSales(allItems, 'day');
      this.detailedMonthlyList = this.groupDetailedSales(allItems, 'month');
      this.filteredMonthlyList = this.detailedMonthlyList;
      this.detailedYearlyList = this.groupDetailedSales(allItems, 'year');
      this.filteredYearlyList = this.detailedYearlyList;
    });
  }

  calculateSales(items: OrderItem[], range: 'day' | 'month' | 'year'): number {
    const now = new Date();

    return items
      .filter(item => {
        if (!item.orderDate) return false;
        const date = new Date(item.orderDate);
        if (range === 'day') {
          return date.toDateString() === now.toDateString();
        } else if (range === 'month') {
          return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        } else if (range === 'year') {
          return date.getFullYear() === now.getFullYear();
        }
        return false;
      })
      .reduce((sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 0), 0);
  }

  groupDetailedSales(items: OrderItem[], range: 'day' | 'month' | 'year'): SalesItemDetail[] {
    const now = new Date();

    const filtered = items.filter(item => {
      if (!item.orderDate) return false;
      const date = new Date(item.orderDate);
      if (range === 'day') {
        return date.toDateString() === now.toDateString();
      } else if (range === 'month') {
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      } else if (range === 'year') {
        return date.getFullYear() === now.getFullYear();
      }
      return false;
    });

    return filtered.map(item => {
      const dateObj = new Date(item.orderDate!);
      return {
        name: item.name ?? 'Unknown',
        quantity: item.quantity ?? 0,
        price: item.price ?? 0,
        total: (item.quantity ?? 0) * (item.price ?? 0),
        date: dateObj.toLocaleDateString(),
        time: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    });
  }

  // 🔍 Filtering
  filterMonthlySales() {
    const search = this.monthlySearch.toLowerCase();
    this.filteredMonthlyList = this.detailedMonthlyList.filter(item =>
      item.name.toLowerCase().includes(search) || item.date.toLowerCase().includes(search)
    );
  }

  filterYearlySales() {
    const search = this.yearlySearch.toLowerCase();
    this.filteredYearlyList = this.detailedYearlyList.filter(item =>
      item.name.toLowerCase().includes(search) || item.date.toLowerCase().includes(search)
    );
  }






  //   todaySales: number = 0;
  // monthlySales: number = 0;
  // yearlySales: number = 0;

  // topSellingMedicines: { name: string; quantitySold: number }[] = [];

  // // ✅ Updated detailed lists with date & time
  // detailedTodayList: { name: string; quantity: number; price: number; total: number; date: string; time: string }[] = [];
  // detailedMonthlyList: { name: string; quantity: number; price: number; total: number; date: string; time: string }[] = [];
  // detailedYearlyList: { name: string; quantity: number; price: number; total: number; date: string; time: string }[] = [];

  // constructor(private salesReportService: SalesReportServiceService) {}

  // ngOnInit(): void {
  //   this.salesReportService.getSalesReportData().subscribe(({ orders, products }) => {
  //     const allItems = orders.flatMap((order: Order) =>
  //       (order.items || []).map(item => ({
  //         ...item,
  //         orderDate: order.date?.toString()
  //       }))
  //     );

  //     // Total sales amount calculations
  //     this.todaySales = this.calculateSales(allItems, 'day');
  //     this.monthlySales = this.calculateSales(allItems, 'month');
  //     this.yearlySales = this.calculateSales(allItems, 'year');

  //     // Top Selling Medicines
  //     const salesMap = new Map<string, number>();
  //     allItems.forEach((item: { name: string; quantity: number; }) => {
  //       if (item.name) {
  //         const quantity = item.quantity ?? 0;
  //         salesMap.set(item.name, (salesMap.get(item.name) || 0) + quantity);
  //       }
  //     });

  //     this.topSellingMedicines = Array.from(salesMap.entries())
  //       .map(([name, quantitySold]) => ({ name, quantitySold }))
  //       .sort((a, b) => b.quantitySold - a.quantitySold)
  //       .slice(0, 5);

  //     // ✅ Detailed sales lists with date/time
  //     this.detailedTodayList = this.groupDetailedSales(allItems, 'day');
  //     this.detailedMonthlyList = this.groupDetailedSales(allItems, 'month');
  //     this.detailedYearlyList = this.groupDetailedSales(allItems, 'year');
  //   });
  // }

  // calculateSales(items: OrderItem[], range: 'day' | 'month' | 'year'): number {
  //   const now = new Date();

  //   return items
  //     .filter(item => {
  //       if (!item.orderDate) return false;
  //       const date = new Date(item.orderDate);
  //       if (range === 'day') {
  //         return date.toDateString() === now.toDateString();
  //       } else if (range === 'month') {
  //         return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  //       } else if (range === 'year') {
  //         return date.getFullYear() === now.getFullYear();
  //       }
  //       return false;
  //     })
  //     .reduce((sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 0), 0);
  // }

  // groupDetailedSales(items: OrderItem[], range: 'day' | 'month' | 'year'): { name: string; quantity: number; price: number; total: number; date: string; time: string }[] {
  //   const now = new Date();

  //   const filtered = items.filter(item => {
  //     if (!item.orderDate) return false;
  //     const date = new Date(item.orderDate);
  //     if (range === 'day') {
  //       return date.toDateString() === now.toDateString();
  //     } else if (range === 'month') {
  //       return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  //     } else if (range === 'year') {
  //       return date.getFullYear() === now.getFullYear();
  //     }
  //     return false;
  //   });

  //   // Return each record with its own date/time
  //   return filtered.map(item => {
  //     const dateObj = new Date(item.orderDate!);
  //     return {
  //       name: item.name ?? 'Unknown',
  //       quantity: item.quantity ?? 0,
  //       price: item.price ?? 0,
  //       total: (item.quantity ?? 0) * (item.price ?? 0),
  //       date: dateObj.toLocaleDateString(),
  //       time: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  //     };
  //   });
  // }

}
