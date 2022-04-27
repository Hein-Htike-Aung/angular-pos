import { AccountService } from './../../service/account.service';
import { LoginRequestPayload, UserResponse } from './../../model/app.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  loggedInUser: UserResponse;

  constructor(
    private accountService: AccountService,
    private builder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginRequestPayload = {
      username: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.loginForm = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    this.accountService.login(this.loginRequestPayload).subscribe({
      next: (_) => {
        const userRole = this.accountService.getUserRole();

        if (userRole === 'ROLE_ADMIN') {
          // dashboard
          this.router.navigateByUrl('/admin-home');
        } else if (userRole === 'ROLE_EMPLOYEE') {
          this.router.navigateByUrl('/master/product/list');
        } else {
          // public home
          this.router.navigateByUrl('/public-home');;
        }
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.error?.message || 'Invalid Credential');
        throwError(() => error);
      },
    });
  }
}
