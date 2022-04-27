import { BrandDto, CategoryDto } from './../../model/app.model';
import { BrandService } from './../../service/brand.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.scss'],
})
export class BrandEditComponent implements OnInit {
  categoryDto: CategoryDto;
  brandForm: FormGroup;
  brandListPayload: BrandDto[];
  brands: BrandDto[] = [];

  constructor(
    private brandService: BrandService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private builder: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.brandForm = this.builder.group({
      brands: this.builder.array([]),
    });

    this.activatedRoute.queryParams.subscribe((resp) => {
      this.categoryService.getById(resp['categoryId']).subscribe((resp) => {
        this.categoryDto = resp;

        // Find All Brands for Category
        this.brandService
          .findAllBrandsForCategory(this.categoryDto.id)
          .subscribe((resp) => {
            this.brands = resp;
            // Modify Form Value after receiving categoryDto Data
            this.brands.forEach((_) => this.addBrandControl());

            // Patch the Form Values
            this.brandForm.patchValue({
              brands: resp,
            });
          });
      });
    });
  }

  addBrandControl() {
    this.brandsFormArray.push(
      this.builder.group({
        categoryId: this.categoryDto?.id,
        brandName: '',
      })
    );
  }

  deleteBrandControl(index: number) {
    this.brandsFormArray.length > 1 ? this.brandsFormArray.removeAt(index) : '';
  }

  get brandsFormArray(): FormArray {
    return this.brandForm.get('brands') as FormArray;
  }

  save() {
    this.brandListPayload = this.brandForm.value;

    this.brandService
      .createBrandList(
        // Filtering blank Value
        this.brandListPayload!['brands'].filter((b: BrandDto) => b.brandName)
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
