export interface TopMedicine {

  id?: number;
  name: string;
  quantitySold: number;
}

export interface SalesSummary {
  id?: number;
  todaySales: number;
  monthlySales: number;
  yearlySales: number;
  topSellingMedicines: TopMedicine[];
}
