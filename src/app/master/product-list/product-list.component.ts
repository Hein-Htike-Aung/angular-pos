import { ProductDto, Product_Photo } from './../../model/app.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { ProductService } from './../../service/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: ProductDto[];
  keyword: string;

  constructor(
    private productService: ProductService,
    private builder: FormBuilder,
    private toastr: ToastrService,
    private rounter: Router
  ) {
    this.getAllProducts();
  }

  ngOnInit(): void {}

  getAllProducts() {
    this.productService.getAll().subscribe((resp) => {
      this.products = resp;
      this.products.forEach(p => {
        this.productService.findAllPhotosForProduct(p.id).subscribe(resp => p.photos = resp);
        this.productService.findAllPropertiesForProduct(p.id).subscribe(resp => p.properties = resp);
      });
    });
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

  goToProductEdit(id: number) {
    this.rounter.navigateByUrl('/master/product/edit/' + id);
  }

}
