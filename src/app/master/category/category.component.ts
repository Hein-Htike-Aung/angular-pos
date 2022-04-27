import { ErrorProvider } from './../../shared/provider/error.provider';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmModalDialogComponent } from './../../shared/widgets/confirm-modal-dialog/confirm-modal-dialog.component';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryDto } from './../../model/app.model';
import { CategoryService } from './../../service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categories: CategoryDto[] = [];
  category: CategoryDto;
  keyword: string;
  categoryForm: FormGroup;

  @ViewChild(ConfirmModalDialogComponent)
  confirmModalDialogComponent: ConfirmModalDialogComponent;

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private router: Router,
    private builder: FormBuilder
  ) {
    this.category = {
      id: 0,
      categoryName: '',
    };

    this.getAllCategories();
  }

  ngOnInit(): void {
    this.categoryForm = this.builder.group({
      id: 0,
      categoryName: ['', [Validators.required]],
    });
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe((resp) => (this.categories = resp));
  }

  save() {
    this.category.id = this.categoryForm.get('id').value;
    this.category.categoryName = this.categoryForm.get('categoryName').value;

    this.categoryService.save(this.category).subscribe({
      next: (resp) => {
        console.log(resp.message);
        this.categoryForm.reset();
        this.getAllCategories();
      },
      error: (resp) => {
        console.log(resp);
        this.toastr.error(resp.error.message);
      },
    });
  }

  edit(c: CategoryDto) {
    this.categoryForm.patchValue(c);
  }

  search(value: string) {
    const result: CategoryDto[] = [];

    this.categories.forEach((c) => {
      if (
        c.categoryName
          .toLocaleLowerCase()
          .indexOf(value.toLocaleLowerCase()) !== -1
      ) {
        result.push(c);
      }
    });

    this.categories = result;

    if (this.categories.length === 0 || !value) {
      this.getAllCategories();
    }
  }

  confirmDeleteCategory(c: CategoryDto) {
    this.category = c;
    this.confirmModalDialogComponent.open();
  }

  delete(value: any) {
    if (value) {
      this.categoryService.delete(this.category.id).subscribe({
        next: (resp) => {
          console.log(resp.message);
          this.confirmModalDialogComponent.close();
          this.getAllCategories();
        },
        error: (error) => {
          console.log(error);
          this.confirmModalDialogComponent.close();
          this.toastr.error(error.error?.message);
        },
      });
    }
  }

  goToSubCategoryEdit(c: CategoryDto) {
    this.router.navigate(['/sub-category/edit'], {
      queryParams: { categoryId: c.id },
    });
  }

  goToBrandEdit(c: CategoryDto) {
    this.router.navigate(['/brand/edit'], {
      queryParams: { categoryId: c.id },
    });
  }

  showError(controlName: string) {
    return ErrorProvider.showError(controlName, this.categoryForm);
  }
}
