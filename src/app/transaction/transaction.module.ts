import { MatFormFieldModule } from '@angular/material/form-field';
import { InstantDatePipe } from './../shared/pipe/instant-date.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionComponent } from './transaction.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PublicModule } from '../public/public.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { OrderListComponent } from './order-list/order-list.component';
import { SalesHistoryComponent } from './sales-history/sales-history.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { CusAndPaymentInfoComponent } from './cus-and-payment-info/cus-and-payment-info.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { CusOrderListComponent } from './cus-order-list/cus-order-list.component';

@NgModule({
  declarations: [
    TransactionComponent,
    PurchaseComponent,
    PurchaseListComponent,
    ProductDetailsComponent,
    OrderListComponent,
    SalesHistoryComponent,
    CartItemsComponent,
    CusAndPaymentInfoComponent,
    CheckOutComponent,
    CusOrderListComponent,
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    SharedModule,
    PublicModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule
  ],
  providers: [
    InstantDatePipe
  ]
})
export class TransactionModule { }
