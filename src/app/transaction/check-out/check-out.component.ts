import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderRequestPayload } from 'src/app/model/app.model';
import { CustomerDto } from './../../model/app.model';
import { OrderService } from './../../service/order.service';
import { OrderRequestProvider } from './../../shared/provider/order-request.provider';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit {
  customerDto: CustomerDto;
  description: string = '';
  orderRequestPayload: OrderRequestPayload;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private orderRequestProvider: OrderRequestProvider,
    private toastr: ToastrService
  ) {
    this.orderRequestPayload = this.orderRequestProvider.orderRequestPayload;
    this.customerDto = this.orderRequestPayload.customerDto;
  }

  ngOnInit(): void {}

  checkOut() {
    if (this.orderRequestPayload.orderDetails.length == 0) {
      this.toastr.info('Add some Proudcts into cart before you make purchase');
    } else {
      this.orderRequestPayload.description = this.description;

      this.orderRequestPayload.orderDetails.forEach((od) => {
        od.productId = od.product.id;
      });
      
      console.log(this.orderRequestPayload);

      this.orderService.create(this.orderRequestPayload).subscribe({
        next: (_) => {
          this.orderRequestProvider.reset();
          this.router.navigateByUrl('/');
        },
        error: (error) => console.log(error),
      });
    }
  }
}
