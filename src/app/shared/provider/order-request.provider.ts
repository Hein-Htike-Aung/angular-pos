import { ProductService } from './../../service/product.service';
import {
  OrderRequestPayload,
  ProductDto,
  OrderDetailsRequestPayload,
} from './../../model/app.model';
import { Component, Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderRequestProvider {
  orderRequestPayload: OrderRequestPayload;

  constructor(private productService: ProductService) {
    this.initializeOrderRequestPayload();
  }

  initializeOrderRequestPayload() {
    this.orderRequestPayload = {
      id: 0,
      customerDto: null,
      description: '',
      orderDetails: [],
      payment: {
        id: 0,
        card: '',
        cardType: '',
        expireDate: '',
        safeGuard: 0,
      },
    };
  }

  setProduct(p: ProductDto, quantity: number) {
    let updated = false;

    this.orderRequestPayload.orderDetails.forEach((od, index) => {
      if (od.product.id == p.id) {
        updated = true;

        this.orderRequestPayload.orderDetails[index].product.id = p.id;
        this.orderRequestPayload.orderDetails[index].quantity =
          this.orderRequestPayload.orderDetails[index].quantity + quantity;
      }
    });
    if (this.orderRequestPayload.orderDetails.length == 0 || !updated) {
      this.orderRequestPayload.orderDetails.push({
        id: 0,
        product: p,
        quantity: quantity,
      });
    }
  }

  delete(p: ProductDto) {
    this.orderRequestPayload.orderDetails =
      this.orderRequestPayload.orderDetails.filter(
        (od) => od.product.id !== p.id
      );
  }

  get cartCount() {
    let total = 0;
    this.orderRequestPayload?.orderDetails.forEach((od) => {
      total += od.quantity;
    });

    return total;
  }

  addQuantity(p: ProductDto) {
    this.orderRequestPayload.orderDetails.forEach((od) => {
      
      // chech with in-stock product Quantity
      this.productService.getById(od.product.id).subscribe((resp) => {
        const product = resp;
        if (product.quantity > od.quantity) {
          if (od.product.id === p.id) {
            ++od.quantity;
          }
        }
      });
    });
  }

  reduceQuantity(p: ProductDto) {
    this.orderRequestPayload.orderDetails.forEach((od) => {
      if (od.product.id === p.id) {
        if (od.quantity > 1) {
          --od.quantity;
        }
      }
    });
  }

  reset() {
    this.orderRequestPayload = null;
  }
}
