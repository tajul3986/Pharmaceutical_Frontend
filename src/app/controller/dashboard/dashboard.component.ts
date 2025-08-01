import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { Order, OrderItem } from 'src/app/model/order.model';
import { DashboardService } from 'src/app/services/dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

//  totalMedicines: number = 0;
//   stockAlerts: number = 0;
//   monthlySales: number = 0;
//   newOrders: number = 0;
//   recentOrders: any[] = [];

//   constructor(private dashboardService: DashboardService) {}

//   ngOnInit(): void {
//     this.dashboardService.getDashboardData().subscribe(({ products, orders }) => {
//       // Total Medicines
//       this.totalMedicines = products.length;
//       this.stockAlerts = products.filter((p: { stock: number | undefined; }) => p.stock !== undefined && p.stock < 5).length;

//       // Monthly Sales (sum of quantities from OrderItem[])
//       const currentMonth = new Date().getMonth();
//       this.monthlySales = orders
//         .filter((order: Order) => new Date(order.date!).getMonth() === currentMonth)
//         .flatMap((order: Order) => order.items || [])
//         .reduce((sum: number, item: OrderItem) => sum + (item.quantity ?? 0), 0);

//       // New Orders this month
//       this.newOrders = orders.filter((order: Order) =>
//         new Date(order.date!).getMonth() === currentMonth
//       ).length;

//       // Recent Orders Table (last 5 order items)
//       const recentItems = orders
//         .flatMap((order: Order) =>
//           (order.items || []).map(item => ({
//             id: order.id,
//             medicine: item.name ?? 'Unknown',
//             quantity: item.quantity ?? 0,
//             date: order.date
//           }))
//         )
//         .sort((a: { date: string | number | Date; }, b: { date: string | number | Date; }) => new Date(b.date).getTime() - new Date(a.date).getTime())
//         .slice(0, 5);

//       this.recentOrders = recentItems;
//     });
//   }




//with charts

totalMedicines: number = 0;
  stockAlerts: number = 0;
  monthlySales: number = 0;
  newOrders: number = 0;
  recentOrders: any[] = [];

  // Chart data
  barChartLabels: string[] = [];
  barChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  barChartOptions: ChartOptions = {
    responsive: true
  };
  barChartType: ChartType = 'bar';

  pieChartLabels: string[] = [];
  pieChartData: ChartData<'pie'> = { labels: [], datasets: [] };
  pieChartOptions: ChartOptions = {
    responsive: true
  };
  pieChartType: ChartType = 'pie';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getDashboardData().subscribe(({ products, orders }) => {
      this.totalMedicines = products.length;
      this.stockAlerts = products.filter((p: { stock: number | undefined; }) => p.stock !== undefined && p.stock < 5).length;

      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const thisMonthOrders = orders.filter((order: Order) => {
        const date = new Date(order.date!);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
      });

      const thisMonthItems = thisMonthOrders.flatMap((order: Order) => order.items || []);
      this.monthlySales = thisMonthItems.reduce((sum: number, item: OrderItem) => sum + (item.quantity ?? 0), 0);

      this.newOrders = thisMonthOrders.length;

      this.recentOrders = orders
        .flatMap((order: Order) =>
          (order.items || []).map(item => ({
            id: order.id,
            medicine: item.name ?? 'Unknown',
            quantity: item.quantity ?? 0,
            date: order.date
          }))
        )
        .sort((a: { date: string | number | Date; }, b: { date: string | number | Date; }) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);

      // Bar Chart Data - Monthly medicine sales quantity by name
      const barMap = new Map<string, number>();
      thisMonthItems.forEach((item: { name: string; quantity: number; }) => {
        if (item.name) {
          const qty = item.quantity ?? 0;
          barMap.set(item.name, (barMap.get(item.name) || 0) + qty);
        }
      });

      this.barChartLabels = Array.from(barMap.keys());
      this.barChartData = {
        labels: this.barChartLabels,
        datasets: [
          {
            label: 'Qty Sold',
            data: Array.from(barMap.values()),
            backgroundColor: '#42A5F5'
          }
        ]
      };

      // Pie Chart Data - Stock Distribution
      const pieLabels = products.map((p: any) => p.name);
      const pieData = products.map((p: any) => p.stock ?? 0);

      this.pieChartLabels = pieLabels;
      this.pieChartData = {
        labels: this.pieChartLabels,
        datasets: [
          {
            data: pieData,
            backgroundColor: pieLabels.map(() => this.getRandomColor())
          }
        ]
      };
    });
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
