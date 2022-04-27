import { OrderResponse } from 'src/app/model/app.model';
import { OrderService } from 'src/app/service/order.service';
import { PurchaseResponse, ProductDto } from './../../model/app.model';
import { PurchaseService } from './../../service/purchase.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.scss'],
})
export class OrderReportComponent implements OnInit {
  order: OrderResponse;
  totalAmount = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) {
    this.activatedRoute.queryParams.subscribe((param) => {
      const id = param['id'];

      if (id) {
        this.orderService.getById(id).subscribe((resp) => {
          this.order = resp;

          this.orderService
            .getOrderDetailsForOrder(this.order.id)
            .subscribe((resp) => {
              this.order.orderDetails = resp;
              this.calculateTotalAmount();
            });
        });
      }
    });
  }

  calculateTotalAmount() {
    this.totalAmount = 0;
    this.order.orderDetails.forEach((_, index) => {
      this.totalAmount += this.getUnitTotal(index);
    });
  }

  getUnitTotal(index: number) {
    let unitTotal = 0;
    this.order.orderDetails?.forEach((pd) => {
      unitTotal += pd.productResponse.price * pd.quantity;
    });

    return unitTotal;
  }

  ngOnInit(): void {}

  print() {
    window.print();
  }
}
