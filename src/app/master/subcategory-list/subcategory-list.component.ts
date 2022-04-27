import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/service/category.service';
import { ConfirmModalDialogComponent } from './../../shared/widgets/confirm-modal-dialog/confirm-modal-dialog.component';
import { Router } from '@angular/router';
import { SubCategoryService } from './../../service/sub-category.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SubCategoryDto } from 'src/app/model/app.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-subcategory-list',
  templateUrl: './subcategory-list.component.html',
  styleUrls: ['./subcategory-list.component.scss'],
})
export class SubcategoryListComponent implements OnInit {
  subCategories: SubCategoryDto[] = [];
  keyword: string;
  subCategory: SubCategoryDto;
  @ViewChild(ConfirmModalDialogComponent)
  confirmModalDialogComponent: ConfirmModalDialogComponent;

  constructor(
    private subCategoryService: SubCategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllSubCategories();
  }

  search(value: string) {
    const result: SubCategoryDto[] = [];

    this.subCategories.forEach((sc) => {
      if (
        sc.subCategoryName
          .toLocaleLowerCase()
          .indexOf(value.toLocaleLowerCase()) !== -1 ||
        sc.categoryName
          .toLocaleLowerCase()
          .indexOf(value.toLocaleLowerCase()) !== -1
      ) {
        result.push(sc);
      }
    });

    this.subCategories = result;

    if (this.subCategories.length == 0 || !value) {
      this.getAllSubCategories();
    }
  }

  confirmDelete(sc: SubCategoryDto) {
    this.subCategory = sc;
    this.confirmModalDialogComponent.open();
  }

  delete(value: any) {
    if (value) {
      this.subCategoryService.delete(this.subCategory.id).subscribe({
        next: (_) => {
          this.getAllSubCategories();
          this.confirmModalDialogComponent.close();
        },
        error: (error) => {
          this.toastr.error(error.error?.message);
          this.confirmModalDialogComponent.close();
        },
      });
    }
  }

  getAllSubCategories() {
    this.subCategoryService
      .getAll()
      .subscribe((resp) => (this.subCategories = resp));
  }
}
