import { CustomerService } from './../../service/customer.service';
import { AccountService } from './../../service/account.service';
import {
  CustomerDto,
  UserResponse,
  OrderResponse,
} from './../../model/app.model';
import { Router } from '@angular/router';
import { OrderService } from './../../service/order.service';
import { Component, OnInit } from '@angular/core';
import { OrderStatus } from 'src/app/enummeration/app.enum';

@Component({
  selector: 'app-cus-order-list',
  templateUrl: './cus-order-list.component.html',
  styleUrls: ['./cus-order-list.component.scss'],
})
export class CusOrderListComponent implements OnInit {
  customerDto: CustomerDto;
  orders: OrderResponse[];
  totalAmount = 0;

  constructor(
    private orderService: OrderService,
    private accountService: AccountService,
    private customerService: CustomerService,
    private router: Router
  ) {
    this.orderService.getOrdersForCustomer;
  }

  ngOnInit(): void {
    this.accountService.currentUser().subscribe((resp: UserResponse) => {
      this.customerService.getCustomerByUserId(resp.id).subscribe((resp) => {
        this.customerDto = resp;

        // find Orders For Customer
        this.orderService
          .getOrdersForCustomer(this.customerDto.id)
          .subscribe((resp: OrderResponse[]) => {
            this.orders = resp.sort((a, b) =>
              b.orderStatus.localeCompare(a.orderStatus)
            );

            this.orders.forEach((o) => {
              this.orderService
                .getOrderDetailsForOrder(o.id)
                .subscribe((resp) => {
                  o.orderDetails = resp;

                  // Calculate Total Amount
                  this.calculateTotalAmount();
                });
            });
          });
      });
    });
  }

  calculateTotalAmount() {
    this.totalAmount = 0;
    this.orders?.forEach((_, index) => {
      this.totalAmount += this.getUnitTotal(index);
    });
  }

  getUnitTotal(index: number) {
    let unitTotal = 0;
    this.orders[index].orderDetails?.forEach((pd) => {
      unitTotal += pd.productResponse.price * pd.quantity;
    });

    return unitTotal;
  }
}
