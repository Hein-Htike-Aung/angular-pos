import { InstantDatePipe } from './../../shared/pipe/instant-date.pipe';
import { InfoModalDialogComponent } from './../../shared/widgets/info-modal-dialog/info-modal-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderResponse, CustomerDto } from './../../model/app.model';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from './../../service/order.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderStatus } from 'src/app/enummeration/app.enum';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orderList: OrderResponse[];

  constructor(private orderService: OrderService) {
    this.getAllOrders();
  }

  ngOnInit(): void {}

  getAllOrders() {
    this.orderService.getAll().subscribe((resp: OrderResponse[]) => {
      resp = this.filteringPendingOrders(resp);
      this.orderList = resp;
    });
  }

  filteringPendingOrders(orders: OrderResponse[]) {
    return orders.filter((o) => o.orderStatus === OrderStatus.PENDING);
  }
}
