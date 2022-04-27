import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormModalDialogComponent } from './widgets/form-modal-dialog/form-modal-dialog.component';
import { ConfirmModalDialogComponent } from './widgets/confirm-modal-dialog/confirm-modal-dialog.component';
import { InstantDatePipe } from './pipe/instant-date.pipe';
import { NgModule } from "@angular/core";
import { AlertModalDialogComponent } from './widgets/alert-modal-dialog/alert-modal-dialog.component';
import { InfoModalDialogComponent } from './widgets/info-modal-dialog/info-modal-dialog.component';
import { DateRangeComponent } from './widgets/date-range/date-range.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { OrdersTableComponent } from './widgets/orders-table/orders-table.component';
import { CartItemsComponent } from './widgets/cart-items/cart-items.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ForbiddenComponent } from './widgets/forbidden/forbidden.component';

@NgModule({
    declarations: [
      InstantDatePipe,
      ConfirmModalDialogComponent,
      FormModalDialogComponent,
      AlertModalDialogComponent,
      InfoModalDialogComponent,
      DateRangeComponent,
      OrdersTableComponent,
      CartItemsComponent,
      ForbiddenComponent
    ],
    imports: [
      MatDatepickerModule,
      MatNativeDateModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatButtonToggleModule,
      ReactiveFormsModule,
      FormsModule,
      CommonModule
    ],
    exports: [
      InstantDatePipe,
      ConfirmModalDialogComponent,
      FormModalDialogComponent,
      AlertModalDialogComponent,
      InfoModalDialogComponent,
      DateRangeComponent,
      OrdersTableComponent,
      CartItemsComponent
    ]
  })
  export class SharedModule { }