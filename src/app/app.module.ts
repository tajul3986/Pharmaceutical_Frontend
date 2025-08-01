import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './controller/header/header.component';
import { FooterComponent } from './controller/footer/footer.component';
import { HomeComponent } from './controller/home/home.component';
import { AddproductComponent } from './controller/addproduct/addproduct.component';
import { LoginComponent } from './controller/login/login.component';
import { RegisterComponent } from './controller/register/register.component';
import { CategoryComponent } from './controller/category/category.component';
import { SubcategoryComponent } from './controller/subcategory/subcategory.component';
import { ProductListComponent } from './controller/product-list/product-list.component';
import { ProductDetailsComponent } from './controller/product-details/product-details.component';
import { AdminDashboardComponent } from './controller/admin-dashboard/admin-dashboard.component';
import { PaymentComponent } from './controller/payment/payment.component';
import { RawMaterialComponent } from './controller/raw-material/raw-material.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import appRoutes from 'src/routes';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { WarehouseComponent } from './manufacture/warehouse/warehouse.component';
import { WarehouseFormComponent } from './manufacture/warehouse-form/warehouse-form.component';
import { WarehouseListComponent } from './manufacture/warehouse-list/warehouse-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CardComponent } from './controller/card/card.component';
import { EditProductComponent } from './controller/edit-product/edit-product.component';
import { MatSelectModule } from '@angular/material/select';
import { RawMaterialListComponent } from './controller/raw-material-list/raw-material-list.component';
import { SellerComponent } from './controller/seller/seller.component';
import { RawMaterialImportComponent } from './controller/raw-material-import/raw-material-import.component';
import { ManufacturingComponent } from './manufacture/manufacturing/manufacturing.component';
import { DashboardComponent } from './controller/dashboard/dashboard.component';
import { ProductCardComponent } from './controller/product-card/product-card.component';
import { CartPageComponent } from './controller/cart-page/cart-page.component';
import { BlankLayoutComponent } from './controller/blank-layout/blank-layout.component';
import { MainLayoutComponent } from './controller/main-layout/main-layout.component';
import { DeliveryInformationComponent } from './controller/delivery-information/delivery-information.component';
import { OrderSummaryComponent } from './controller/order-summary/order-summary.component';
import { InvoiceComponent } from './controller/invoice/invoice.component';
import { StockComponent } from './controller/stock/stock.component';
import { OrderManagementComponent } from './controller/order-management/order-management.component';
import { SalesReportComponent } from './controller/sales-report/sales-report.component';
import { NgChartsModule } from 'ng2-charts';
import { InventoryComponent } from './controller/inventory/inventory.component';







@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AddproductComponent,
    LoginComponent,
    RegisterComponent,
    CategoryComponent,
    SubcategoryComponent,
    ProductListComponent,
    ProductDetailsComponent,
    AdminDashboardComponent,
    PaymentComponent,
    RawMaterialComponent,
    WarehouseComponent,
    WarehouseFormComponent,
    WarehouseListComponent,
    CardComponent,
    EditProductComponent,
    RawMaterialListComponent,
    SellerComponent,
    RawMaterialImportComponent,
    ManufacturingComponent,
    DashboardComponent,
    ProductCardComponent,
    CartPageComponent,
    BlankLayoutComponent,
    MainLayoutComponent,
    DeliveryInformationComponent,
    OrderSummaryComponent,
    InvoiceComponent,
    StockComponent,
    OrderManagementComponent,
    SalesReportComponent,
    InventoryComponent,
    
   
    
    
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
     MatMenuModule,
     ReactiveFormsModule,
     MatFormFieldModule,
     MatSelectModule,
    NgChartsModule

     
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
