import { ConfirmModalDialogComponent } from './../../shared/widgets/confirm-modal-dialog/confirm-modal-dialog.component';
import { BrandDto } from './../../model/app.model';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from './../../service/brand.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss'],
})
export class BrandListComponent implements OnInit {
  brands: BrandDto[] = [];
  keyword: string;
  brandDto: BrandDto;
  @ViewChild(ConfirmModalDialogComponent)
  confirmModalDialogComponent: ConfirmModalDialogComponent;

  constructor(
    private brandService: BrandService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllBrands();
  }

  search(value: string) {
    const result: BrandDto[] = [];

    this.brands.forEach((sc) => {
      if (
        sc.brandName.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1 ||
        sc.categoryName.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1
      ) {
        result.push(sc);
      }
    });

    this.brands = result;

    if (this.brands.length == 0 || !value) {
      this.getAllBrands();
    }
  }

  confirmDelete(b: BrandDto) {
    this.brandDto = b;
    this.confirmModalDialogComponent.open();
  }

  delete(value: any) {
    if (value) {
      this.brandService.delete(this.brandDto.id).subscribe({
        next: (_) => {
          this.getAllBrands();
          this.confirmModalDialogComponent.close();
        },
        error: (error) => {
          this.toastr.error(error.error?.message);
          this.confirmModalDialogComponent.close();
        },
      });
    }
  }

  getAllBrands() {
    this.brandService.getAll().subscribe((resp) => (this.brands = resp));
  }
}
