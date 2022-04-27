import { ErrorProvider } from './../../shared/provider/error.provider';
import { CustomerDto } from './../../model/app.model';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { HttpResponseBase, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from './../../service/account.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  customerDto: CustomerDto;
  customerRegisterForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private builder: FormBuilder,
    private toastrService: ToastrService
  ) {
    this.customerDto = {
      id: 0,
      username: '',
      password: '',
      email: '',
      address: '',
      enabled: false,
      fullName: '',
      phone: '',
    };
  }

  ngOnInit(): void {
    this.customerRegisterForm = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  signUp() {
    this.customerDto.address = this.customerRegisterForm.get('address').value;
    this.customerDto.email = this.customerRegisterForm.get('email').value;
    this.customerDto.fullName = this.customerRegisterForm.get('fullName').value;
    this.customerDto.password = this.customerRegisterForm.get('password').value;
    this.customerDto.phone = this.customerRegisterForm.get('phone').value;
    this.customerDto.username = this.customerRegisterForm.get('username').value;

    this.accountService.signUpCustomer(this.customerDto).subscribe({
      next: (_) => {
        this.toastrService.success(
          'Activate your account before you try to login.'
        );
        this.router.navigateByUrl('/login');
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.toastrService.error(error.error?.message);
      },
    });
  }

  showError(controlName: string) {
    return ErrorProvider.showError(controlName, this.customerRegisterForm);
  }
}
