import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDto } from './../../model/app.model';
import { ProductService } from './../../service/product.service';
import { OrderRequestProvider } from './../../shared/provider/order-request.provider';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productDto: ProductDto;
  selectedPhotoIndex = 0;
  quantity = 1;

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private orderRequestProvider: OrderRequestProvider
  ) {
    const productId = this.activatedRoute.snapshot.params['id'];
    // For Edit
    if (productId != 0) {
      this.productService.getById(productId).subscribe((resp) => {
        this.productDto = resp;

        this.productService
          .findAllPhotosForProduct(this.productDto.id)
          .subscribe((resp) => {
            this.productDto.photos = resp;
          });
        this.productService
          .findAllPropertiesForProduct(this.productDto.id)
          .subscribe((resp) => {
            this.productDto.properties = resp;
          });
      });
    }
  }

  ngOnInit(): void {}

  reduceQuantity() {
    if (this.quantity > 1) {
      --this.quantity;
    }
  }

  addQuantity() {
    if (this.quantity < this.productDto.quantity) {
      ++this.quantity;
    }
  }

  addToCart() {
    if (this.isQuantityValid()) {
      this.orderRequestProvider.setProduct(this.productDto, this.quantity);
    }
  }

  isQuantityValid() {
    let isValid: boolean = true;

    this.orderRequestProvider.orderRequestPayload.orderDetails.forEach((od) => {
      if (od.product.id == this.productDto.id) {
        if (od.quantity == this.productDto.quantity) {
          isValid = false;
        }
      }
    });

    return isValid;
  }

  displayPhoto(index: number) {
    this.selectedPhotoIndex = index;

    return this.productDto?.photos ? this.productDto?.photos[index].photo : '';
  }
}
