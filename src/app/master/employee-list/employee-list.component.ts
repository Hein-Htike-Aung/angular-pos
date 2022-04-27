import { ConfirmModalDialogComponent } from './../../shared/widgets/confirm-modal-dialog/confirm-modal-dialog.component';
import { Router } from '@angular/router';
import { EmployeeDto } from './../../model/app.model';
import { EmployeeService } from './../../service/employee.service';
import { AccountService } from './../../service/account.service';
import { Component, OnInit, ViewChild, enableProdMode } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  employees: EmployeeDto[];
  keyword: string;
  @ViewChild(ConfirmModalDialogComponent)
  confirmModalDialogComponent: ConfirmModalDialogComponent;
  employee: EmployeeDto;

  constructor(
    private accountService: AccountService,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEmployeList();
  }

  search(value: string) {
    const result: EmployeeDto[] = [];

    this.employees.forEach((e) => {
      if (
        e.fullName.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !==
          -1 ||
        e.address.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !==
          -1 ||
        e.email.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1 ||
        e.maritalStatus
          .toLocaleLowerCase()
          .indexOf(value.toLocaleLowerCase()) !== -1 ||
        e.gender.toString().toUpperCase() === value.toUpperCase()
      ) {
        result.push(e);
      }
    });

    this.employees = result;

    if (result.length === 0 || !value) {
      this.getEmployeList();
    }
  }

  goToEmployeeEdit(id: number) {
    this.router.navigateByUrl('employee/edit/' + id);
  }

  getEmployeList() {
    this.employeeService.getAllEmployees().subscribe({
      next: (resp) => {
        this.employees = resp;
        this.employees.sort((a, b) => Number(b.enabled) - Number(a.enabled));
      },
      error: (error) => console.log(error),
    });
  }

  confirmDeleteEmployee(e: EmployeeDto) {
    this.employee = e;
    this.confirmModalDialogComponent.open();
  }

  delete(value: any) {
    if (value) {
      this.accountService.blockAccount(this.employee.username).subscribe({
        next: (resp) => {
          console.log(resp);
          this.confirmModalDialogComponent.close();
          this.getEmployeList();
        },
        error: (error) => console.log(error),
      });
    }
  }
}
