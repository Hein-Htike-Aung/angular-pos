import { ApiResponse, SupplierDto } from './../model/app.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = `${environment.apiUrl}/supplier`;

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private http: HttpClient) {}

  getById(id: number): Observable<SupplierDto> {
    return this.http.get<SupplierDto>(`${API}/${id}`);
  }

  getAllSuppliers(): Observable<SupplierDto[]> {
    return this.http.get<SupplierDto[]>(`${API}/list`);
  }

  save(supplierDto: SupplierDto): Observable<ApiResponse> {
    console.log(supplierDto);
    if (supplierDto.id !== 0) {
      // edit
      return this.http.put<ApiResponse>(
        `${API}/update/${supplierDto.id}`,
        supplierDto
      );
    } else {
      // Add New
      return this.http.post<ApiResponse>(`${API}/create`, supplierDto);
    }
  }

  update(supplierDto: SupplierDto): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(
      `${API}/update/${supplierDto.id}`,
      supplierDto
    );
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${API}/delete/${id}`);
  }
}
