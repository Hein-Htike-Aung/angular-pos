import { CustomerService } from './../../service/customer.service';
import { EmployeeService } from './../../service/employee.service';
import {
  UserResponse,
  EmployeeDto,
  CustomerDto,
} from './../../model/app.model';
import { AccountService } from './../../service/account.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userRole: string;
  loggedInUser: UserResponse;
  employeeDto: EmployeeDto;
  customerDto: CustomerDto;

  constructor(
    private activatedRouter: ActivatedRoute,
    private accountService: AccountService,
    private employeeService: EmployeeService,
    private customerService: CustomerService
  ) {
    this.userRole = this.accountService.getUserRole();

    this.accountService.currentUser().subscribe((resp) => {
      this.loggedInUser = resp;

      if (this.userRole === 'ROLE_EMPLOYEE') {
        this.employeeService
          .getByUserId(this.loggedInUser.id)
          .subscribe((resp) => {
            this.employeeDto = resp;
          });
      } else if (this.userRole === 'ROLE_CUSTOMER') {
        this.customerService
          .getCustomerByUserId(this.loggedInUser.id)
          .subscribe((resp) => (this.customerDto = resp));
      }
    });
  }

  ngOnInit(): void {}
}
