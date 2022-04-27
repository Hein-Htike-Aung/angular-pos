import { CategoryService } from 'src/app/service/category.service';
import { switchMap } from 'rxjs/operators';
import { Observable, tap, map, forkJoin } from 'rxjs';
import { SubCategoryDto, ApiResponse } from './../model/app.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = `${environment.apiUrl}/subcategory`;

@Injectable({
  providedIn: 'root',
})
export class SubCategoryService {
  constructor(
    private http: HttpClient,
    private categoryService: CategoryService
  ) {}

  getAll(): Observable<SubCategoryDto[]> {
    return this.http.get<SubCategoryDto[]>(`${API}/list`);
  }

  getById(id: number): Observable<SubCategoryDto> {
    return this.http.get<SubCategoryDto>(`${API}/${id}`);
  }

  findAllSubCategoriesForCategory(
    categoryId: number
  ): Observable<SubCategoryDto[]> {
    return this.http.get<SubCategoryDto[]>(`${API}/by-category/${categoryId}`);
  }

  createSubCategoryList(
    SubCategoryDtoList: SubCategoryDto[]
  ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${API}/create/list`,
      SubCategoryDtoList
    );
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${API}/delete/${id}`);
  }

  update(subCategoryDto: SubCategoryDto): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(
      `${API}/update/${subCategoryDto.id}`,
      subCategoryDto
    );
  }
}
