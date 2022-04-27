import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  EmployeeDto,
  EmployeeUpdateRequestPayload
} from './../../../model/app.model';
import { AccountService } from './../../../service/account.service';
import { EmployeeService } from './../../../service/employee.service';
import { ErrorProvider } from './../../../shared/provider/error.provider';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss'],
})
export class EmployeeProfileComponent implements OnInit {
  employeeForm: FormGroup;
  employeeUpdateRequestPayload: EmployeeUpdateRequestPayload;
  userRole: string;

  @Input()
  employeeDto: EmployeeDto;

  constructor(
    private employeeService: EmployeeService,
    private rounter: Router,
    private builder: FormBuilder,
    private toastr: ToastrService,
    private accountService: AccountService
  ) {

    this.userRole = this.accountService.getUserRole();

    this.employeeUpdateRequestPayload = {
      id: 0,
      address: '',
      email: '',
      maritalStatus: '',
      phone: '',
    };
  }

  ngOnInit(): void {
    this.employeeForm = this.builder.group({
      phone: [this.employeeDto.phone, [Validators.required]],
      address: [this.employeeDto.address, [Validators.required]],
      email: [this.employeeDto.email, [Validators.required, Validators.email]],
      maritalStatus: [this.employeeDto.maritalStatus, Validators.required],
    });
  }

  update() {
    this.employeeUpdateRequestPayload.id = this.employeeDto.id;
    this.employeeUpdateRequestPayload.phone =
      this.employeeForm.get('phone').value;
    this.employeeUpdateRequestPayload.address =
      this.employeeForm.get('address').value;
    this.employeeUpdateRequestPayload.maritalStatus =
      this.employeeForm.get('maritalStatus').value;
    this.employeeUpdateRequestPayload.email =
      this.employeeForm.get('email').value;

    this.employeeService.update(this.employeeUpdateRequestPayload).subscribe({
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
    return ErrorProvider.showError(controlName, this.employeeForm);
  }

  goBack() {
    if(this.userRole === 'ROLE_CUSTOMER') {
      this.rounter.navigateByUrl('/customer-home');
    }else {
      this.rounter.navigateByUrl('/employee-home');
    }
  }
}
