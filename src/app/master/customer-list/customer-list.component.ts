import { AccountService } from './../../service/account.service';
import { ConfirmModalDialogComponent } from './../../shared/widgets/confirm-modal-dialog/confirm-modal-dialog.component';
import { CustomerDto } from './../../model/app.model';
import { CustomerService } from './../../service/customer.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  customers: CustomerDto[];
  customer: CustomerDto;
  keyword: string;
  @ViewChild(ConfirmModalDialogComponent)
  confirmModalDialogComponent: ConfirmModalDialogComponent;

  constructor(
    private customerService: CustomerService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.customerService.getAll().subscribe({
      next: (resp) => {
        this.customers = resp;
        this.customers.sort(
          (a, b) => Number(b.enabled) - Number(a.enabled)
        );
      },
      error: (error) => console.log(error),
    });
  }

  search(value: string) {
    const result: CustomerDto[] = [];

    this.customers.forEach((c) => {
      if (
        c.fullName.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !==
          -1 ||
        c.address.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !==
          -1 ||
        c.username.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !==
          -1 ||
        c.phone.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1
      ) {
        result.push(c);
      }
    });

    this.customers = result;

    if (result.length === 0 || !value) {
      this.getAllCustomers();
    }
  }

  confirmDeleteCustomer(c: CustomerDto) {
    this.customer = c;
    this.confirmModalDialogComponent.open();
  }

  delete(value: any) {
    if (value) {
      this.accountService.blockAccount(this.customer.username).subscribe({
        next: (resp) => {
          console.log(resp);
          this.confirmModalDialogComponent.close();
          this.getAllCustomers();
        },
        error: (error) => console.log(error),
      });
    }
  }
}
