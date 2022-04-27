import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse, BrandDto } from '../model/app.model';

const API = `${environment.apiUrl}/brand`;

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<BrandDto[]> {
    return this.http.get<BrandDto[]>(`${API}/list`);
  }

  getById(id: number): Observable<BrandDto> {
    return this.http.get<BrandDto>(`${API}/${id}`);
  }

  findAllBrandsForCategory(categoryId: number): Observable<BrandDto[]> {
    return this.http.get<BrandDto[]>(`${API}/by-category/${categoryId}`);
  }

  createBrandList(brandDtoList: BrandDto[]): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${API}/create/list`, brandDtoList);
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${API}/delete/${id}`);
  }

  update(brandDto: BrandDto): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${API}/update/${brandDto.id}`, brandDto);
  }
}
