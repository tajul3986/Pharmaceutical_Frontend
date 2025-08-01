
// Only Login and registration


import { Routes } from '@angular/router';

import { LoginComponent } from './app/controller/login/login.component';
import { RegisterComponent } from './app/controller/register/register.component';
import { HomeComponent } from './app/controller/home/home.component';
import { ProductCardComponent } from './app/controller/product-card/product-card.component';
import { CartPageComponent } from './app/controller/cart-page/cart-page.component';
import { AdminDashboardComponent } from './app/controller/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './app/controller/dashboard/dashboard.component';
import { SellerComponent } from './app/controller/seller/seller.component';
import { ProductListComponent } from './app/controller/product-list/product-list.component';
import { AddproductComponent } from './app/controller/addproduct/addproduct.component';
import { CategoryComponent } from './app/controller/category/category.component';
import { SubcategoryComponent } from './app/controller/subcategory/subcategory.component';
import { EditProductComponent } from './app/controller/edit-product/edit-product.component';
import { RawMaterialComponent } from './app/controller/raw-material/raw-material.component';
import { ManufacturingComponent } from './app/manufacture/manufacturing/manufacturing.component';
import { RawMaterialListComponent } from './app/controller/raw-material-list/raw-material-list.component';
import { RawMaterialImportComponent } from './app/controller/raw-material-import/raw-material-import.component';
import { BlankLayoutComponent } from './app/controller/blank-layout/blank-layout.component';
import { MainLayoutComponent } from './app/controller/main-layout/main-layout.component';
import { PaymentComponent } from './app/controller/payment/payment.component';
import { DeliveryInformationComponent } from './app/controller/delivery-information/delivery-information.component';
import { InvoiceComponent } from './app/controller/invoice/invoice.component';
import { OrderSummaryComponent } from './app/controller/order-summary/order-summary.component';
import { StockComponent } from './app/controller/stock/stock.component';
import { OrderManagementComponent } from './app/controller/order-management/order-management.component';
import { SalesReportComponent } from './app/controller/sales-report/sales-report.component';
import { InventoryComponent } from './app/controller/inventory/inventory.component';
import { ProductDetailsComponent } from './app/controller/product-details/product-details.component';
// import other components...

const appRoutes: Routes = [ 

  // Main site routes - with header/footer

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      
      { path: 'home', component: HomeComponent },
      { path: 'productcard', component: ProductCardComponent },
      { path: 'cart', component: CartPageComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'delivery', component: DeliveryInformationComponent },
      { path: 'invoice', component: InvoiceComponent },
      { path: 'order-summary', component: OrderSummaryComponent },
      { path: 'product-details', component: ProductDetailsComponent },
      
    ]
  },

  {
        path: 'admin',
        component: AdminDashboardComponent,
        children: [
          { path: '', redirectTo: 'dash', pathMatch: 'full' },
          { path: 'dash', component: DashboardComponent },                    
          { path: 'prolist', component: ProductListComponent },
          { path: 'addmedicine', component: AddproductComponent },
          { path: 'seller', component: SellerComponent },
          { path: 'addmedicine', component: AddproductComponent },
          { path: 'category', component: CategoryComponent },
          { path: 'subcategory', component: SubcategoryComponent },
          { path: 'edit/:id', component: EditProductComponent },
          { path: 'raw', component: RawMaterialComponent },
          { path: 'rawlist', component: RawMaterialListComponent },
          { path: 'manu', component: ManufacturingComponent },
          { path: 'imprt', component: RawMaterialImportComponent },
          { path: 'stock', component: StockComponent },
          { path: 'ordermanage', component: OrderManagementComponent },
          { path: 'invoice/:id', component: InvoiceComponent },
          { path: 'sales', component: SalesReportComponent },
          { path: 'inventory', component: InventoryComponent }
        ]
      },

      // Public routes - no layout (login/register)
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'regi', component: RegisterComponent }
    ]
  },
      
      // { path: '**', redirectTo: 'home' } 
];
export default appRoutes;
