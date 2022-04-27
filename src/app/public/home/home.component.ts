import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubCategoryDto } from 'src/app/model/app.model';
import { CategoryService } from 'src/app/service/category.service';
import { BrandDto, CategoryDto, ProductDto } from './../../model/app.model';
import { BrandService } from './../../service/brand.service';
import { ProductService } from './../../service/product.service';
import { SubCategoryService } from './../../service/sub-category.service';
import { iif } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: ProductDto[] = [];
  categories: CategoryDto[] = [];
  brands: BrandDto[] = [];
  subcategories: SubCategoryDto[] = [];
  keyword: string;
  viewAllSubCategories: boolean = false;
  viewAllBrands: boolean = false;
  priceForm: FormGroup;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private router: Router,
    private subCategoryService: SubCategoryService,
    private builder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.getAllProducts();
    this.getAllCategories();
    this.getBrandsForView();
    this.getSubCategoriesForView();
  }

  ngOnInit(): void {
    this.priceForm = this.builder.group({
      priceFrom: '',
      priceTo: '',
    });
  }

  refreshData() {
    this.viewAllBrands = false;
    this.viewAllSubCategories = false;
    this.priceForm.reset();
    this.getAllProducts();
    this.getAllCategories();
    this.getBrandsForView();
    this.getSubCategoriesForView();
  }

  getAllProducts() {
    this.productService.getAll().subscribe((resp: ProductDto[]) => {
      this.filteringAvailableProduct(resp);
    });
  }

  filteringAvailableProduct(productDtos: ProductDto[]) {
    this.products = productDtos.filter((p) => p.quantity > 0);
    this.products.forEach((p) => {
      this.productService
        .findAllPhotosForProduct(p.id)
        .subscribe((resp) => (p.photos = resp));
      this.productService
        .findAllPropertiesForProduct(p.id)
        .subscribe((resp) => (p.properties = resp));
    });
  }

  getBrandsForView() {
    this.brandService.getAll().subscribe((resp: BrandDto[]) => {
      if (resp.length > 5) {
        this.brands = resp.splice(0, 5);
        this.viewAllBrands = true;
      } else {
        this.brands = resp;
      }
    });
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe((resp) => (this.categories = resp));
  }

  getSubCategoriesForView() {
    this.subCategoryService.getAll().subscribe((resp: SubCategoryDto[]) => {
      if (resp.length > 5) {
        this.subcategories = resp.splice(0, 5);
        this.viewAllSubCategories = true;
      } else {
        this.subcategories = resp;
      }
    });
  }

  getAllSubCategories() {
    this.subCategoryService
      .getAll()
      .subscribe((resp: SubCategoryDto[]) => (this.subcategories = resp));
    this.viewAllSubCategories = false;
  }

  getAllBrands() {
    this.brandService
      .getAll()
      .subscribe((resp: BrandDto[]) => (this.brands = resp));
    this.viewAllBrands = false;
  }

  search(value: string) {
    const result: ProductDto[] = [];

    this.products.forEach((p) => {
      if (
        p.productName.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !=
          -1 ||
        p.brandDto.brandName
          .toLocaleLowerCase()
          .indexOf(value.toLocaleLowerCase()) != -1 ||
        p.subCategoryDto.subCategoryName
          .toLocaleLowerCase()
          .indexOf(value.toLocaleLowerCase()) != -1 ||
        p.brandDto.categoryName
          .toLocaleLowerCase()
          .indexOf(value.toLocaleLowerCase()) != -1
      ) {
        result.push(p);
      }
    });

    this.products = result;

    if (this.products.length == 0 || !value) {
      this.getAllProducts();
    }
  }

  searchProductByBrand(brandId: number) {
    this.productService
      .findAllProductsByBrandId(brandId)
      .subscribe((resp) => this.filteringAvailableProduct(resp));
  }

  searchProductBySubCategory(subcategoryId: number) {
    this.productService
      .findAllProductsBySubCategoryId(subcategoryId)
      .subscribe((resp) => this.filteringAvailableProduct(resp));
  }

  searchProductByCategory(catId: number) {
    this.productService.getAll().subscribe((resp: ProductDto[]) => {
      this.products = resp
        .filter((p) => p.quantity > 0)
        .filter((p) => {
          if (p.brandDto.categoryId == catId) {
            return true;
          }
          if (p.subCategoryDto.categoryId == catId) {
            return true;
          }
          return false;
        });

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

  searchByPrice() {
    const pFrom = this.priceForm.get('priceFrom').value;
    const pTo = this.priceForm.get('priceTo').value;

    if(pFrom > pTo) {
      this.toastr.info('Price To must be greater than Price From');
    }

    this.productService.getAll().subscribe((resp: ProductDto[]) => {
      this.products = resp
        .filter((p) => p.quantity > 0)
        .filter((p) => {
          if (p.price >= pFrom && p.price <= pTo) {
            return true;
          }
          return false;
        });

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

  goToProductDetails(productId: number) {
    this.router.navigateByUrl('/transaction/product-details/' + productId);
  }
}
