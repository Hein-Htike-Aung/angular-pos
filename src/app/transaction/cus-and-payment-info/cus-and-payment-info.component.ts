import { Router } from '@angular/router';
import { cardType } from './../../enummeration/app.enum';
import { OrderRequestProvider } from './../../shared/provider/order-request.provider';
import { AppValidators } from './../../shared/validators/app.validators';
import { ErrorProvider } from './../../shared/provider/error.provider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerDto } from './../../model/app.model';
import { CustomerService } from './../../service/customer.service';
import { EmployeeService } from './../../service/employee.service';
import { AccountService } from './../../service/account.service';
import { Component, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/model/app.model';

@Component({
  selector: 'app-cus-and-payment-info',
  templateUrl: './cus-and-payment-info.component.html',
  styleUrls: ['./cus-and-payment-info.component.scss'],
})
export class CusAndPaymentInfoComponent implements OnInit {
  customerDto: CustomerDto;
  customerForm: FormGroup;
  paymentForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private orderRequestProvider: OrderRequestProvider,
    private customerService: CustomerService,
    private builder: FormBuilder,
    private router: Router
  ) {
    this.customerForm = this.builder.group({
      id: 0,
      fullName: ['', Validators.required],
      username: '',
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
    });

    this.paymentForm = this.builder.group({
      id: 0,
      card: ['', [Validators.required, AppValidators.validateCard]],
      cardType: '',
      expireDate: [
        '',
        [Validators.required, Validators.pattern('[0-9][0-9]/[0-9][0-9]')],
      ],
      safeGuard: [
        '',
        [Validators.required, Validators.min(100), Validators.max(999)],
      ],
    });
  }

  ngOnInit(): void {
    this.accountService.currentUser().subscribe((resp: UserResponse) => {
      this.customerService.getCustomerByUserId(resp.id).subscribe((resp) => {
        this.customerDto = resp;
        this.customerForm.patchValue(this.customerDto);
      });
    });
  }

  showErrorForCustomer(name: string) {
    return ErrorProvider.showError(name, this.customerForm);
  }

  showErrorForPayment(name: string) {
    return ErrorProvider.showError(name, this.paymentForm);
  }

  addPaymentAndCustomerInfo() {
    const card: string = this.paymentForm.value.card;
    if (card.startsWith('4')) {
      this.paymentForm.value.cardType = cardType.VISA;
    }
    if (card.startsWith('5')) {
      this.paymentForm.value.cardType = cardType.MASTER_CARD;
    }
    if (card.startsWith('6')) {
      this.paymentForm.value.cardType = cardType.DISCOVER;
    }

    this.orderRequestProvider.orderRequestPayload.customerDto =
      this.customerForm.value;
    this.orderRequestProvider.orderRequestPayload.payment =
      this.paymentForm.value;

    this.router.navigateByUrl('/transaction/check-out');
  }
}
