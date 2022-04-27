import { Observable } from 'rxjs';
import { CategoryDto, ApiResponse } from './../model/app.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = `${environment.apiUrl}/category`;

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`${API}/list`);
  }

  getById(id: number): Observable<CategoryDto> {
    return this.http.get<CategoryDto>(`${API}/${id}`);
  }

  save(categoryDto: CategoryDto): Observable<ApiResponse> {
    if (categoryDto.id != 0 && categoryDto.id != undefined) {
      return this.http.put<ApiResponse>(
        `${API}/update/${categoryDto.id}`,
        categoryDto
      );
    } else {
      return this.http.post<ApiResponse>(`${API}/create`, categoryDto);
    }
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${API}/delete/${id}`);
  }
}
