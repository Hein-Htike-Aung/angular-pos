import { Router } from '@angular/router';
import { InfoModalDialogComponent } from './../../shared/widgets/info-modal-dialog/info-modal-dialog.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { InstantDatePipe } from './../../shared/pipe/instant-date.pipe';
import {
  PurchaseResponse,
  PurchaseDetialsResponse,
  EmployeeDto,
  SupplierDto,
} from './../../model/app.model';
import { PurchaseService } from './../../service/purchase.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss'],
})
export class PurchaseListComponent implements OnInit {
  purchaseList: PurchaseResponse[];
  originalPurchaseList: PurchaseResponse[];
  purchaseDetialsResponse: PurchaseDetialsResponse;
  keyword: string = '';
  totalAmount = 0;
  selectedEmployee: EmployeeDto;
  selectedSupplier: SupplierDto;

  @ViewChild(InfoModalDialogComponent)
  infoModalDialogComponent: InfoModalDialogComponent;

  constructor(
    private purchaseService: PurchaseService,
    private instantDatePipe: InstantDatePipe,
    private router: Router
  ) {
    this.getAllPurchase();
  }

  ngOnInit(): void {}

  search() {
    const result: PurchaseResponse[] = [];

    // Input Search
    this.originalPurchaseList.forEach((p) => {
      if (
        p.employeeDto.fullName
          .toLocaleLowerCase()
          .indexOf(this.keyword.toLocaleLowerCase()) !== -1 ||
        p.supplierDto.fullName
          .toLocaleLowerCase()
          .indexOf(this.keyword.toLocaleLowerCase()) !== -1 ||
        p.supplierDto.orgName
          .toLocaleLowerCase()
          .indexOf(this.keyword.toLocaleLowerCase()) !== -1
      ) {
        result.push(p);
      } else {
        p.purchaseDetails?.forEach((pd) => {
          if (
            pd.productResponse.productName
              .toLocaleLowerCase()
              .indexOf(this.keyword.toLocaleLowerCase()) !== -1
          ) {
            result.push(p);
          }
        });
      }
    });

    this.purchaseList = result;

    if (!this.keyword) {
      this.getAllPurchase();
    }

    this.calculateTotalAmount();
  }

  dateSearch(dateRange: { start: Date; end: Date }) {
    let dateF: string, dateT: string;
    if (dateRange.start) {
      dateF = new Date(dateRange.start).toLocaleDateString();
    }
    if (dateRange.end) {
      dateT = new Date(dateRange.end).toLocaleDateString();
    }

    this.purchaseList = this.originalPurchaseList.filter((p) => {
      const actualDate = new Date(
        this.instantDatePipe.transform(p.purchaseDate)
      ).toLocaleDateString();

      return actualDate >= dateF && actualDate <= dateT;
    });

    this.calculateTotalAmount();

  }

  showEmployeeOrSupplier(e: EmployeeDto = null, s: SupplierDto = null) {
    this.selectedEmployee = e;
    this.selectedSupplier = s;

    this.infoModalDialogComponent.open();
  }

  getAllPurchase() {
    this.purchaseService.getAll().subscribe((resp) => {
      this.purchaseList = resp;
      this.originalPurchaseList = resp;

      this.purchaseList?.forEach((pl) => {
        this.purchaseService
          .getPurchaseDetailsByPurchaseId(pl.id)
          .subscribe((resp) => {
            pl.purchaseDetails = resp;

            // Caculate Total Amount
            this.calculateTotalAmount();
          });
      });
    });
  }

  getUnitTotal(index: number) {
    let unitTotal = 0;
    this.purchaseList[index].purchaseDetails?.forEach((pd) => {
      unitTotal += pd.productResponse.price * pd.quantity;
    });

    return unitTotal;
  }

  calculateTotalAmount() {
    this.totalAmount = 0;
    this.purchaseList?.forEach((_, index) => {
      this.totalAmount += this.getUnitTotal(index);
    }); 
  }

  goToReport(p: PurchaseResponse) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/master/purchase/report/'], {
        queryParams: { id: p.id },
      })
    );
    window.open(url, '_blank');
  }
}
