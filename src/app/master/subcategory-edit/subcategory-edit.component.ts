import { CategoryService } from './../../service/category.service';
import { CategoryDto, SubCategoryDto } from './../../model/app.model';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SubCategoryService } from './../../service/sub-category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subcategory-edit',
  templateUrl: './subcategory-edit.component.html',
  styleUrls: ['./subcategory-edit.component.scss'],
})
export class SubcategoryEditComponent implements OnInit {
  categoryDto: CategoryDto;
  subCategoryForm: FormGroup;
  subCegoryListPayload: SubCategoryDto[];
  subCategories: SubCategoryDto[] = [];

  constructor(
    private subCategoryService: SubCategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private builder: FormBuilder,
    private categoryService: CategoryService
  ) {}
    
  ngOnInit(): void {
    this.subCategoryForm = this.builder.group({
      subcategories: this.builder.array([]),
    });

    this.activatedRoute.queryParams.subscribe((resp) => {
      this.categoryService.getById(resp['categoryId']).subscribe((resp) => {
        this.categoryDto = resp;

        // Find All Subcategories for Category
        this.subCategoryService
          .findAllSubCategoriesForCategory(this.categoryDto.id)
          .subscribe((resp) => {
            this.subCategories = resp;
            // Modify Form Value after receiving categoryDto Data
            this.subCategories.forEach((_) => this.addSubCategoryControl());

            // Patch the Form Values
            this.subCategoryForm.patchValue({
              subcategories: resp,
            });
          });
      });
    });
  }

  addSubCategoryControl() {
    this.subcategories.push(
      this.builder.group({
        categoryId: this.categoryDto?.id,
        subCategoryName: '',
      })
    );
  }

  deleteSubCategoryControl(index: number) {
    this.subcategories.length > 1 ? this.subcategories.removeAt(index) : '';
  }

  get subcategories(): FormArray {
    return this.subCategoryForm.get('subcategories') as FormArray;
  }

  save() {
    this.subCegoryListPayload = this.subCategoryForm.value;

    this.subCategoryService
      .createSubCategoryList(
        // Filtering blank Value
        this.subCegoryListPayload!['subcategories'].filter(
          (sc: SubCategoryDto) => sc.subCategoryName
        )
      )
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.router.navigateByUrl('/category');
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
