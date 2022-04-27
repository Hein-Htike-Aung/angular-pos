import { ConfirmModalDialogComponent } from './../../shared/widgets/confirm-modal-dialog/confirm-modal-dialog.component';
import { ErrorProvider } from './../../shared/provider/error.provider';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  BrandDto,
  Product_Photo,
  SubCategoryDto,
} from 'src/app/model/app.model';
import { CategoryService } from 'src/app/service/category.service';
import {
  CategoryDto,
  ProductDto,
  ProductRequestPayload,
} from './../../model/app.model';
import { BrandService } from './../../service/brand.service';
import { ProductService } from './../../service/product.service';
import { SubCategoryService } from './../../service/sub-category.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  productDto: ProductDto;
  productForm: FormGroup;
  productRequestPayload: ProductRequestPayload;
  categories: CategoryDto[] = [];
  subCategories: SubCategoryDto[] = [];
  brands: BrandDto[] = [];

  @ViewChild(ConfirmModalDialogComponent)
  confirmModalDialogComponent: ConfirmModalDialogComponent;

  constructor(
    private productService: ProductService,
    private activtedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private subcategoryService: SubCategoryService,
    private brandService: BrandService,
    private toastr: ToastrService,
    private rounter: Router,
    private builder: FormBuilder
  ) {
    const id = this.activtedRoute.snapshot.params['id'];
    // For Edit
    if (id != 0) {
      this.productService.getById(id).subscribe((resp) => {
        this.productDto = resp;
        this.productService
          .findAllPhotosForProduct(this.productDto.id)
          .subscribe((resp) => {
            this.productDto.photos = resp;
            this.productDto.photos.forEach((_, index) => {
              if (index != 0) {
                this.addPhoto();
              }
            });
            this.mergeFormData(this.productDto);
          });
        this.productService
          .findAllPropertiesForProduct(this.productDto.id)
          .subscribe((resp) => {
            this.productDto.properties = resp;
            this.productDto.properties.forEach((_, index) => {
              if (index != 0) {
                this.addProperty();
              }
            });
            this.mergeFormData(this.productDto);
          });
      });
    }

    this.instantiatedProductRequestPayload();

    // UI
    this.categoryService.getAll().subscribe((resp) => (this.categories = resp));

    this.getAllBrands();
    this.getAllSubCategories();
  }

  getAllBrands() {
    this.brandService.getAll().subscribe((resp) => (this.brands = resp));
  }

  getAllSubCategories() {
    this.subcategoryService
      .getAll()
      .subscribe((resp) => (this.subCategories = resp));
  }

  ngOnInit(): void {
    this.productForm = this.builder.group({
      productName: ['', Validators.required],
      quantity: ['', Validators.min(0)],
      price: ['', [Validators.required, Validators.min(10)]],
      categoryId: ['', Validators.required],
      brandId: ['', Validators.required],
      subCategoryId: ['', Validators.required],
      photos: this.builder.array([]),
      properties: this.builder.array([]),
    });

    this.addPhoto();
    this.addProperty();
  }

  mergeFormData(productDto: ProductDto) {
    this.productForm.patchValue({
      productName: productDto.productName,
      quantity: productDto.quantity,
      price: productDto.price,
      categoryId: productDto.brandDto.categoryId,
      brandId: productDto.brandDto.id,
      subCategoryId: productDto.subCategoryDto.id,
      photos: productDto.photos,
      properties: productDto.properties,
    });
  }

  instantiatedProductRequestPayload() {
    this.productRequestPayload = {
      id: 0,
      productName: '',
      brandId: 0,
      price: 0,
      quantity: 0,
      subCategoryId: 0,
      photos: [],
      properties: [],
    };
  }

  categoryOnChange(id: string) {
    if (id) {
      this.brandService
        .findAllBrandsForCategory(+id)
        .subscribe((resp) => (this.brands = resp));
      this.subcategoryService
        .findAllSubCategoriesForCategory(+id)
        .subscribe((resp) => (this.subCategories = resp));
    } else {
      this.getAllBrands();
      this.getAllSubCategories();
    }
  }

  save() {
    this.productRequestPayload.id = this.productDto?.id;
    this.productRequestPayload.productName =
      this.productForm.get('productName').value;
    this.productRequestPayload.brandId = this.productForm.get('brandId').value;
    this.productRequestPayload.price = this.productForm.get('price').value;
    this.productRequestPayload.quantity =
      this.productForm.get('quantity').value;
    this.productRequestPayload.subCategoryId =
      this.productForm.get('subCategoryId').value;
    this.productRequestPayload.photos = this.productForm.get('photos').value;
    this.productRequestPayload.properties =
      this.productForm.get('properties').value;

    this.productService.save(this.productRequestPayload).subscribe({
      next: (resp) => {
        this.productForm.reset();
        this.rounter.navigateByUrl('/master/product/list');
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error?.message);
      },
    });
  }

  confirmDelete() {
    this.confirmModalDialogComponent.open();
  }

  delete(value: any) {
    if (value) {
      this.productService.delete(this.productDto?.id).subscribe({
        next: (resp) => {
          console.log(resp);
          this.confirmModalDialogComponent.close();
          this.rounter.navigateByUrl('/master/product/list');
        },
        error: (error) => {
          console.log(error);
          this.confirmModalDialogComponent.close();
          this.toastr.error(error.error?.message);
        },
      });
    }
  }

  addPhoto() {
    this.photos.push(
      this.builder.group({
        photo: ['', Validators.required],
      })
    );
  }

  addProperty() {
    this.properties.push(
      this.builder.group({
        propertyName: ['', Validators.required],
        propertyValue: ['', Validators.required],
      })
    );
  }

  removePhoto(index: number) {
    this.photos.length > 1 ? this.photos.removeAt(index) : '';
  }

  removeProperty(index: number) {
    this.properties.length > 1 ? this.properties.removeAt(index) : '';
  }

  get photos(): FormArray {
    return this.productForm.get('photos') as FormArray;
  }

  get properties(): FormArray {
    return this.productForm.get('properties') as FormArray;
  }

  showError(name: string) {
    return ErrorProvider.showError(name, this.productForm);
  }

  showErrorForFormArray(
    controlName: string,
    formArrayName: string,
    index: number
  ) {
    return ErrorProvider.showErrorForFormArray(
      controlName,
      this.productForm,
      formArrayName,
      index
    );
  }
}
