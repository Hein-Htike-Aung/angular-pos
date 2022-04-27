import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderRequestPayload, ProductDto } from 'src/app/model/app.model';
import { OrderRequestProvider } from '../../provider/order-request.provider';
import { ConfirmModalDialogComponent } from '../confirm-modal-dialog/confirm-modal-dialog.component';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss']
})
export class CartItemsComponent implements OnInit {

  orderRequestPayload: OrderRequestPayload;
  productDto: ProductDto;
  totalAmount = 0;
  selectedProduct: ProductDto;

  @ViewChild(ConfirmModalDialogComponent)
  confirmModalDialogComponent: ConfirmModalDialogComponent;

  constructor(
    private orderRequestProvider: OrderRequestProvider,
  ) {
    this.orderRequestPayload = this.orderRequestProvider.orderRequestPayload;

    this.calculateTotalAmount();
  }

  ngOnInit(): void {}

  getUnitTotal(index: number) {
    let unitTotal = 0;
    this.orderRequestPayload.orderDetails?.forEach((od) => {
      unitTotal += od.product.price * od.quantity;
    });

    return unitTotal;
  }

  calculateTotalAmount() {
    this.totalAmount = 0;
    this.orderRequestPayload.orderDetails?.forEach((_, index) => {
      this.totalAmount += this.getUnitTotal(index);
    });
  }

  confirmDelete(p: ProductDto) {
    this.selectedProduct = p;
    this.confirmModalDialogComponent.open();
  }

  delete(value: any) {
    if (value) {
      this.orderRequestProvider.delete(this.selectedProduct);
      this.calculateTotalAmount();
      this.confirmModalDialogComponent.close();
    }
  }

  addQuantity(p: ProductDto) {
    this.orderRequestProvider.addQuantity(p);
    this.calculateTotalAmount();
  }

  reduceQuantity(p: ProductDto) {
    this.orderRequestProvider.reduceQuantity(p);
    this.calculateTotalAmount();
  }
}
