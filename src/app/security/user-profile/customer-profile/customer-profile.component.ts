import { CustomerService } from './../../../service/customer.service';
import { ErrorProvider } from './../../../shared/provider/error.provider';
import { CustomerDto } from './../../../model/app.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss'],
})
export class CustomerProfileComponent implements OnInit {
  @Input()
  customerDto: CustomerDto;
  customerForm: FormGroup;

  constructor(
    private rounter: Router,
    private builder: FormBuilder,
    private toastr: ToastrService,
    private accountService: AccountService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customerForm = this.builder.group({
      fullName: [this.customerDto.fullName, Validators.required],
      address: [this.customerDto.address, Validators.required],
      phone: [this.customerDto.phone, Validators.required],
      email: [this.customerDto.email, [Validators.required, Validators.email]],
    });
  }

  update() {
    this.customerDto.address = this.customerForm.get('address').value;
    this.customerDto.fullName = this.customerForm.get('fullName').value;
    this.customerDto.phone = this.customerForm.get('phone').value;
    this.customerDto.email = this.customerForm.get('email').value;

    this.customerService.update(this.customerDto).subscribe({
      next: (_) => {
        this.rounter.navigateByUrl('/');
        this.toastr.success('Successfully updated.\nPlease Login Again');
        this.accountService.logout();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.toastr.error(error.error?.message);
      },
    });
  }

  showError(controlName: string) {
    return ErrorProvider.showError(controlName, this.customerForm);
  }
}
