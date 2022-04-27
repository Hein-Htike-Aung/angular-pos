import {
  ApiResponse,
  ProductRequestPayload,
  Product_Photo,
  Product_Property,
} from './../model/app.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductDto } from '../model/app.model';

const API = `${environment.apiUrl}/product`;

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${API}/list`);
  }

  getById(id: number): Observable<ProductDto> {
    return this.http.get<ProductDto>(`${API}/${id}`);
  }

  save(productRequestPayload: ProductRequestPayload): Observable<ApiResponse> {
    if (
      productRequestPayload.id != 0 &&
      productRequestPayload.id != undefined
    ) {
      return this.http.put<ApiResponse>(
        `${API}/update/${productRequestPayload.id}`,
        productRequestPayload
      );
    } else {
      return this.http.post<ApiResponse>(
        `${API}/create`,
        productRequestPayload
      );
    }
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${API}/delete/${id}`);
  }

  findAllProductsByBrandId(brandId: number): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${API}/by-brand/${brandId}`);
  }

  findAllProductsBySubCategoryId(
    subcategoryId: number
  ): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(
      `${API}/by-subcategory/${subcategoryId}`
    );
  }

  findAllProductsByCategoryId(categoryId: number): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${API}/by-category/${categoryId}`);
  }

  findAllPhotosForProduct(productId: number): Observable<Product_Photo[]> {
    return this.http.get<Product_Photo[]>(
      `${API}/photos/by-product/${productId}`
    );
  }

  findAllPropertiesForProduct(
    productId: number
  ): Observable<Product_Property[]> {
    return this.http.get<Product_Property[]>(
      `${API}/properties/by-product/${productId}`
    );
  }
}
