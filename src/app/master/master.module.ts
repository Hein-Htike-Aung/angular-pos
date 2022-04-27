import { FormModalDialogComponent } from './../shared/widgets/form-modal-dialog/form-modal-dialog.component';
import { PublicModule } from './../public/public.module';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BrandEditComponent } from './brand-edit/brand-edit.component';
import { BrandListComponent } from './brand-list/brand-list.component';
import { CategoryComponent } from './category/category.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { MasterRoutingModule } from './master-routing.module';
import { SubcategoryEditComponent } from './subcategory-edit/subcategory-edit.component';
import { SubcategoryListComponent } from './subcategory-list/subcategory-list.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { OrderReportComponent } from './order-report/order-report.component';
import { PurchaseReportComponent } from './purchase-report/purchase-report.component';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeEditComponent,
    CustomerListComponent,
    CategoryComponent,
    SubcategoryEditComponent,
    BrandEditComponent,
    BrandListComponent,
    SubcategoryListComponent,
    SupplierComponent,
    ProductListComponent,
    ProductEditComponent,
    OrderReportComponent,
    PurchaseReportComponent,
  ],
  imports: [
    MasterRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    SharedModule,
    PublicModule
  ],
  exports: [
  ],
  providers: [DatePipe],
})
export class MasterModule {}
