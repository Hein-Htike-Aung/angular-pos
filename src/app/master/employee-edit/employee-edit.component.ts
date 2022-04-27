import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  EmployeeDto,
  EmployeeUpdateRequestPayload,
} from './../../model/app.model';
import { AccountService } from './../../service/account.service';
import { EmployeeService } from './../../service/employee.service';
import { ErrorProvider } from './../../shared/provider/error.provider';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss'],
})
export class EmployeeEditComponent implements OnInit {
  employeeDto: EmployeeDto;
  employeeUpdateRequestPayload: EmployeeUpdateRequestPayload;
  employeeForm: FormGroup;
  employeeId: number;
  isEdit: boolean;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private builder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private datePipe: DatePipe,
    private toastr: ToastrService
  ) {
    this.employeeId = this.activatedRoute.snapshot.params['id'];

    this.employeeDto = {
      id: this.employeeId,
      fullName: '',
      address: '',
      dob: null,
      email: '',
      gender: null,
      maritalStatus: '',
      password: '',
      phone: '',
      username: '',
      enabled: false,
    };

    this.employeeUpdateRequestPayload = {
      id: this.employeeId,
      email: '',
      address: '',
      maritalStatus: '',
      phone: '',
    };
  }

  ngOnInit(): void {
    this.employeeForm = this.builder.group({
      fullName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      dob: '2000-01-01',
      email: ['', [Validators.required, Validators.email]],
      gender: '',
      maritalStatus: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.min(5)]],
      phone: ['', [Validators.required]],
      username: ['', [Validators.required]],
    });

    if (this.employeeId != 0) {
      this.employeeService.getById(this.employeeId).subscribe((resp) => {
        this.isEdit = true;
        this.employeeForm.patchValue({
          ...resp,
          dob: this.datePipe.transform(
            new Date(+resp.dob * 1000),
            'yyyy-MM-dd'
          ),
        });
      });
    }
  }

  save() {
    if (this.isEdit) {
      // Edit
      this.employeeUpdateRequestPayload.address =
        this.employeeForm.get('address').value;
      this.employeeUpdateRequestPayload.email =
        this.employeeForm.get('email').value;
      this.employeeUpdateRequestPayload.maritalStatus =
        this.employeeForm.get('maritalStatus').value;
      this.employeeUpdateRequestPayload.phone =
        this.employeeForm.get('phone').value;

      this.employeeService.update(this.employeeUpdateRequestPayload).subscribe({
        next: (resp) => {
          this.goToEmployeeList();
        },
        error: (error) => {
          console.log(error);
          this.toastr.error(error.error?.message);
        },
      });
    } else {
      // Add New
      this.employeeDto.fullName = this.employeeForm.get('fullName').value;
      this.employeeDto.address = this.employeeForm.get('address').value;
      this.employeeDto.dob = new Date(
        this.employeeForm.get('dob').value
      ).toISOString();
      this.employeeDto.email = this.employeeForm.get('email').value;
      this.employeeDto.gender = this.employeeForm.get('gender').value;
      this.employeeDto.maritalStatus =
        this.employeeForm.get('maritalStatus').value;
      this.employeeDto.password = this.employeeForm.get('password').value;
      this.employeeDto.phone = this.employeeForm.get('phone').value;
      this.employeeDto.username = this.employeeForm.get('username').value;

      this.accountService.signUpEmployee(this.employeeDto).subscribe({
        next: (resp) => {
          this.goToEmployeeList();
        },
        error: (error) => {
          console.log(error.message);
          this.toastr.error(error.error?.message);
        },
      });
    }
  }

  goToEmployeeList() {
    this.router.navigateByUrl('employee/list');
  }

  showError(controlName: string) {
    return ErrorProvider.showError(controlName, this.employeeForm);
  }
}
