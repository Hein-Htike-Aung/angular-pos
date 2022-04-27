import { OrderReportComponent } from './order-report/order-report.component';
import { PurchaseReportComponent } from './purchase-report/purchase-report.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { BrandListComponent } from './brand-list/brand-list.component';
import { SubcategoryListComponent } from './subcategory-list/subcategory-list.component';
import { BrandEditComponent } from './brand-edit/brand-edit.component';
import { SubcategoryEditComponent } from './subcategory-edit/subcategory-edit.component';
import { CategoryComponent } from './category/category.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierComponent } from './supplier/supplier.component';
import { AdminGuard } from '../shared/guard/admin.guard';
import { EmployeeGuard } from '../shared/guard/employee.guard';

const routes: Routes = [
  {
    path: 'employee/list',
    component: EmployeeListComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'customer/list',
    component: CustomerListComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'employee/edit/:id',
    component: EmployeeEditComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'category',
    component: CategoryComponent,
    canActivate: [EmployeeGuard],
  },
  {
    path: 'sub-category/edit',
    component: SubcategoryEditComponent,
    canActivate: [EmployeeGuard],
  },
  {
    path: 'sub-category/list',
    component: SubcategoryListComponent,
    canActivate: [EmployeeGuard],
  },
  {
    path: 'brand/edit',
    component: BrandEditComponent,
    canActivate: [EmployeeGuard],
  },
  {
    path: 'brand/list',
    component: BrandListComponent,
    canActivate: [EmployeeGuard],
  },
  {
    path: 'product/list',
    component: ProductListComponent,
    canActivate: [EmployeeGuard],
  },
  {
    path: 'product/edit/:id',
    component: ProductEditComponent,
    canActivate: [EmployeeGuard],
  },
  {
    path: 'supplier',
    component: SupplierComponent,
    canActivate: [EmployeeGuard],
  },
  {
    path: 'purchase/report',
    component: PurchaseReportComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'order/report',
    component: OrderReportComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterRoutingModule {}
