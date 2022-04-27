import { InfoModalDialogComponent } from './../../shared/widgets/info-modal-dialog/info-modal-dialog.component';
import { AlertModalDialogComponent } from './../../shared/widgets/alert-modal-dialog/alert-modal-dialog.component';
import { ErrorProvider } from './../../shared/provider/error.provider';
import { CategoryService } from 'src/app/service/category.service';
import { BrandService } from './../../service/brand.service';
import {
  SupplierDto,
  ProductDto,
  CategoryDto,
  SubCategoryDto,
  BrandDto,
  PurchaseDetailsRequestPayload,
  PurchaseRequestPayload,
} from './../../model/app.model';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../../service/product.service';
import { SupplierService } from './../../service/supplier.service';
import { PurchaseService } from './../../service/purchase.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SubCategoryService } from 'src/app/service/sub-category.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {
  suppliers: SupplierDto[];
  products: ProductDto[];
  categories: CategoryDto[] = [];
  subCategories: SubCategoryDto[] = [];
  brands: BrandDto[] = [];
  purchaseRequestPayload: PurchaseRequestPayload;
  purchaseForm: FormGroup;
  selectedSupplier: SupplierDto;
  selectedProduct: ProductDto = null;
  @ViewChild(AlertModalDialogComponent)
  alertModalDialogComponent: AlertModalDialogComponent;
  @ViewChild(InfoModalDialogComponent)
  infoModalDialogComponent: InfoModalDialogComponent;

  totalAmount: number = 0;

  constructor(
    private purchaseService: PurchaseService,
    private supplierService: SupplierService,
    private productService: ProductService,
    private brandService: BrandService,
    private subCategoryService: SubCategoryService,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private builder: FormBuilder
  ) {
    this.getAllCategories();
    this.getAllBrands();
    this.getAllSubCategories();
    this.getAllProducts();
    this.getAllSuppliers();
    this.initializePurchaseRequestPayload();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  checkProduct() {
    if (this.selectedProduct !== null) {
      this.infoModalDialogComponent.open();
    } else {
      this.alertModalDialogComponent.open();
    }
  }

  addProduct() {
    let isExisted = false;
    this.purchaseDetails.controls.forEach((pd) => {
      if (pd.get('productId').value === this.selectedProduct.id) {
        this.toastr.warning('Already added.');
        isExisted = true;
      }
    });

    if(!isExisted) {
      this.addPurchaseDetails(this.selectedProduct.id, 1);
    }
  }

  addPurchaseDetails(productId: number, quantity: number) {
    this.purchaseDetails.push(
      this.builder.group({
        id: 0,
        productId: productId,
        quantity: quantity,
        total: this.getProduct(productId).price,
      })
    );
    this.calculateTotalAmount();
  }

  remove(index: number) {
    this.purchaseDetails.removeAt(index);
    this.calculateTotalAmount();
  }

  save() {    
    if(this.purchaseDetails.controls.length == 0) {
      this.toastr.warning("Add Some Products.");
    }else {
      
      this.purchaseRequestPayload.id = this.purchaseForm.get('id').value;
      this.purchaseRequestPayload.description = this.purchaseForm.get('description').value;
      this.purchaseRequestPayload.supplierId = this.purchaseForm.get('id').value;
      this.purchaseRequestPayload.purchaseDetails = this.purchaseForm.get('purchaseDetails').value;
      this.purchaseRequestPayload.supplierId = this.purchaseForm.get('supplierId').value;

      this.purchaseService.create(this.purchaseRequestPayload).subscribe({
        next: (_) => {
          this.initializeForm();
          this.getAllCategories();
          this.getAllBrands();
          this.getAllSubCategories();
          this.getAllProducts();
          this.getAllSuppliers();
          this.selectedProduct = null;
          this.selectedSupplier = null;
          this.totalAmount = 0;
        },
        error: (error) => {
          console.log(error);
          this.toastr.error(error.error?.message);
        }
      });
    }
  }

  calculateUnitTotal(index: number) {
    let isQuantityValid = true;
    // calculateUnitTotal
    const quantity = this.purchaseDetails.at(index).get('quantity').value;
    if(quantity <= 0) {
      isQuantityValid = false;
    }
    if(isQuantityValid) {
      const product = this.getProductForTable(index);
      this.purchaseDetails
        .at(index)
        .get('total')
        .setValue(product.price * quantity);
  
      // Refresh Total Amount
      this.calculateTotalAmount();
    }else {
      this.toastr.warning('Quantity must be greater than 0.');
    }
    
  }

  calculateTotalAmount() {
    this.totalAmount = 0;
    this.purchaseDetails.controls.forEach((pd) => {
      this.totalAmount += pd.get('total').value;
    });
  }

  getProduct(productId: number) {
    return this.products.find((p) => p.id === productId);
  }

  getProductForTable(index: number): ProductDto {
    const productId = this.purchaseDetails.at(index).get('productId').value;
    return this.products.find((p) => p.id === productId);
  }

  get purchaseDetails() {
    return this.purchaseForm.get('purchaseDetails') as FormArray;
  }

  initializePurchaseRequestPayload() {
    this.purchaseRequestPayload = {
      id: 0,
      description: '',
      supplierId: 0,
      purchaseDetails: [],
    };
  }

  initializeForm() {
    this.purchaseForm = this.builder.group({
      id: 0,
      description: ['', Validators.required],
      supplierId: ['', Validators.required],
      productId: ['', Validators.required],
      purchaseDetails: this.builder.array([]),
    });
  }

  categoryOnChange(id: string) {
    if (id) {
      this.brandService
        .findAllBrandsForCategory(+id)
        .subscribe((resp) => (this.brands = resp));

      this.subCategoryService
        .findAllSubCategoriesForCategory(+id)
        .subscribe((resp) => (this.subCategories = resp));

      this.productService
        .findAllProductsByCategoryId(+id)
        .subscribe((resp) => (this.products = resp));
    } else {
      this.getAllBrands();
      this.getAllSubCategories();
      this.getAllProducts();
    }
  }

  subCategoryOnChange(id: string) {
    if (id) {
      this.productService
        .findAllProductsBySubCategoryId(+id)
        .subscribe((resp) => {
          this.products = resp;
          this.products.forEach((p) => {
            this.productService
              .findAllPhotosForProduct(p.id)
              .subscribe((resp) => (p.photos = resp));
            this.productService
              .findAllPropertiesForProduct(p.id)
              .subscribe((resp) => (p.properties = resp));
          });
        });
    } else {
      this.getAllProducts();
    }
  }

  brandOnChange(id: string) {
    if (id) {
      this.productService.findAllProductsByBrandId(+id).subscribe((resp) => {
        this.products = resp;
        this.products.forEach((p) => {
          this.productService
            .findAllPhotosForProduct(p.id)
            .subscribe((resp) => (p.photos = resp));
          this.productService
            .findAllPropertiesForProduct(p.id)
            .subscribe((resp) => (p.properties = resp));
        });
      });
    } else {
      this.getAllProducts();
    }
  }

  supplierOnChange(id: string) {
    if (id) {
      this.suppliers.filter((s) => {
        if (s.id === +id) {
          this.selectedSupplier = s;
        }
      });
    } else {
      this.selectedSupplier = null;
    }
  }

  productOnChange(id: string) {
    if (id) {
      this.products.filter((p) => {
        if (p.id === +id) {
          this.selectedProduct = p;
        }
      });
    } else {
      this.selectedProduct = null;
    }
  }

  getAllProducts() {
    this.productService.getAll().subscribe((resp) => {
      this.products = resp;
      this.products.forEach((p) => {
        this.productService
          .findAllPhotosForProduct(p.id)
          .subscribe((resp) => (p.photos = resp));
        this.productService
          .findAllPropertiesForProduct(p.id)
          .subscribe((resp) => (p.properties = resp));
      });
    });
  }

  getAllSuppliers() {
    this.supplierService
      .getAllSuppliers()
      .subscribe((resp) => (this.suppliers = resp));
  }

  getAllBrands() {
    this.brandService.getAll().subscribe((resp) => (this.brands = resp));
  }

  getAllSubCategories() {
    this.subCategoryService
      .getAll()
      .subscribe((resp) => (this.subCategories = resp));
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe((resp) => (this.categories = resp));
  }

  showError(name: string) {
    return ErrorProvider.showError(name, this.purchaseForm);
  }
}
