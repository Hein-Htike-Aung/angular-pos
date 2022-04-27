import { Component, OnInit } from '@angular/core';
import { OrderStatus } from 'src/app/enummeration/app.enum';
import { OrderResponse } from 'src/app/model/app.model';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-sales-history',
  templateUrl: './sales-history.component.html',
  styleUrls: ['./sales-history.component.scss']
})
export class SalesHistoryComponent implements OnInit {

  orderList: OrderResponse[];

  constructor(private orderService: OrderService) {
    this.getAllOrders();
  }

  ngOnInit(): void {}

  getAllOrders() {
    this.orderService.getAll().subscribe((resp: OrderResponse[]) => {
      resp = this.filteringConfirmedOrders(resp);
      this.orderList = resp;
    });
  }

  filteringConfirmedOrders(orders: OrderResponse[]) {
    return orders.filter((o) => o.orderStatus === OrderStatus.DELIVERED);
  }

}
