import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PurchaseResponse } from 'src/app/model/app.model';
import { PurchaseService } from 'src/app/service/purchase.service';

@Component({
  selector: 'app-purchase-report',
  templateUrl: './purchase-report.component.html',
  styleUrls: ['./purchase-report.component.scss'],
})
export class PurchaseReportComponent implements OnInit {
  purchase: PurchaseResponse;
  totalAmount = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private purchaseService: PurchaseService
  ) {
    this.activatedRoute.queryParams.subscribe((param) => {
      const id = param['id'];

      if (id) {
        this.purchaseService.getById(id).subscribe((resp) => {
          this.purchase = resp;

          this.purchaseService
            .getPurchaseDetailsByPurchaseId(this.purchase.id)
            .subscribe((resp) => {
              this.purchase.purchaseDetails = resp;

              this.calculateTotalAmount();
            });
        });
      }
    });
  }

  getUnitTotal(index: number) {
    let unitTotal = 0;
    this.purchase.purchaseDetails?.forEach((pd) => {
      unitTotal += pd.productResponse.price * pd.quantity;
    });

    return unitTotal;
  }

  calculateTotalAmount() {
    this.totalAmount = 0;
    this.purchase.purchaseDetails?.forEach((_, index) => {
      this.totalAmount += this.getUnitTotal(index);
    });
  }

  ngOnInit(): void {}

  
  print() {
    window.print();
  }
}
