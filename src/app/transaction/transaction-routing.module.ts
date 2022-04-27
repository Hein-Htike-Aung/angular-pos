import { CustomerGuard } from './../shared/guard/customer.guard';
import { EmployeeGuard } from './../shared/guard/employee.guard';
import { AdminGuard } from './../shared/guard/admin.guard';
import { CusOrderListComponent } from './cus-order-list/cus-order-list.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { CusAndPaymentInfoComponent } from './cus-and-payment-info/cus-and-payment-info.component';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { SalesHistoryComponent } from './sales-history/sales-history.component';
import { OrderListComponent } from './order-list/order-list.component';
import { LoginGuard } from './../shared/guard/login.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionComponent } from './transaction.component';

const routes: Routes = [
  { path: '', component: TransactionComponent },
  {
    path: 'purchase',
    component: PurchaseComponent,
    canActivate: [EmployeeGuard],
  },
  {
    path: 'purchase-list',
    component: PurchaseListComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'order-list',
    component: OrderListComponent,
    canActivate: [EmployeeGuard],
  },
  {
    path: 'sales-history',
    component: SalesHistoryComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'cart-items',
    component: CartItemsComponent,
    canActivate: [CustomerGuard],
  },
  {
    path: 'cus-payment-info',
    component: CusAndPaymentInfoComponent,
    canActivate: [CustomerGuard],
  },
  {
    path: 'check-out',
    component: CheckOutComponent,
    canActivate: [CustomerGuard],
  },
  {
    path: 'cus-order-list',
    component: CusOrderListComponent,
    canActivate: [CustomerGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionRoutingModule {}
