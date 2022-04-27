import { EmployeeDto } from './../../../model/app.model';
import { Router } from '@angular/router';
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { OrderStatus } from 'src/app/enummeration/app.enum';
import { CustomerDto, OrderResponse } from 'src/app/model/app.model';
import { OrderService } from 'src/app/service/order.service';
import { InstantDatePipe } from '../../pipe/instant-date.pipe';
import { InfoModalDialogComponent } from '../info-modal-dialog/info-modal-dialog.component';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss'],
})
export class OrdersTableComponent implements OnInit, OnChanges {
  @Input()
  orderList: OrderResponse[];
  @Input()
  ordersType: string;

  orignalOrderList: OrderResponse[];
  totalAmount: number;
  selectedCustomer: CustomerDto;
  selectedEmployee: EmployeeDto;
  keyword: string;

  @ViewChild(InfoModalDialogComponent)
  infoModalDialogComponent: InfoModalDialogComponent;

  constructor(
    private orderService: OrderService,
    private instantDatePipe: InstantDatePipe,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getAllOrders();
  }

  ngOnInit(): void {}

  confirmOrder(id: number) {
    this.orderService.confirm(id).subscribe({
      next: (_) => {
        this.getAllOrders();
      },
      error: (error) => console.log(error),
    });
  }

  search() {
    const result: OrderResponse[] = [];

    // Input Search
    this.orignalOrderList.forEach((o) => {
      if (
        o.customerDto.fullName
          .toLocaleLowerCase()
          .indexOf(this.keyword.toLocaleLowerCase()) !== -1 ||
        o.customerDto.address
          .toLocaleLowerCase()
          .indexOf(this.keyword.toLocaleLowerCase()) !== -1
      ) {
        result.push(o);
      } else {
        o.orderDetails?.forEach((od) => {
          if (
            od.productResponse.productName
              .toLocaleLowerCase()
              .indexOf(this.keyword.toLocaleLowerCase()) !== -1
          ) {
            result.push(o);
          }
        });
      }
    });

    this.orderList = result;

    if (!this.keyword) {
      this.getAllOrders();
    }

    this.calculateTotalAmount();
  }

  dateSearch(dateRange: { start: Date; end: Date }) {
    let dateF: string, dateT: string;
    if (dateRange.start) {
      dateF = new Date(dateRange.start).toLocaleDateString();
    }
    if (dateRange.end) {
      dateT = new Date(dateRange.end).toLocaleDateString();
    }

    this.orderList = this.orignalOrderList.filter((o) => {
      const actualDate = new Date(
        this.instantDatePipe.transform(o.orderDate)
      ).toLocaleDateString();

      return actualDate >= dateF && actualDate <= dateT;
    });

    this.calculateTotalAmount();
  }

  getAllOrders() {
    this.orderService.getAll().subscribe((resp: OrderResponse[]) => {
      resp =
        this.ordersType === 'PendingOrders'
          ? this.filteringPendingOrders(resp)
          : this.filteringConfirmedOrders(resp);
      this.orderList = resp;
      this.orignalOrderList = resp;
      console.log(this.orderList);

      this.totalAmount = 0;
      this.orderList?.forEach((od) => {
        this.orderService.getOrderDetailsForOrder(od.id).subscribe((resp) => {
          od.orderDetails = resp;

          // Caculate Total Amount
          this.calculateTotalAmount();
        });
      });
    });
  }

  filteringPendingOrders(orders: OrderResponse[]) {
    return orders.filter((o) => o.orderStatus === OrderStatus.PENDING);
  }

  filteringConfirmedOrders(orders: OrderResponse[]) {
    return orders.filter((o) => o.orderStatus === OrderStatus.DELIVERED);
  }

  calculateTotalAmount() {
    this.totalAmount = 0;
    this.orderList?.forEach((_, index) => {
      this.totalAmount += this.getUnitTotal(index);
    });
  }

  getUnitTotal(index: number) {
    let unitTotal = 0;
    this.orderList[index].orderDetails?.forEach((pd) => {
      unitTotal += pd.productResponse.price * pd.quantity;
    });

    return unitTotal;
  }

  showEmployeeOrCustomer(e: EmployeeDto = null, c: CustomerDto = null) {
    this.selectedEmployee = e;
    this.selectedCustomer = c;

    this.infoModalDialogComponent.open();
  }

  goToReport(order: OrderResponse) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/master/order/report/'], {
        queryParams: { id: order.id },
      })
    );
    window.open(url, '_blank');
  }
}
