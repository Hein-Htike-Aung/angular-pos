import { ApiResponse } from './../model/app.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomerDto } from '../model/app.model';

const API = `${environment.apiUrl}/customer`;

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<CustomerDto[]> {
    return this.http.get<CustomerDto[]>(`${API}/list`);
  }

  getCustomerByUserId(userId: number): Observable<CustomerDto> {
    return this.http.get<CustomerDto>(`${API}/by-user/${userId}`);
  }

  getById(id: number): Observable<CustomerDto> {
    return this.http.get<CustomerDto>(`${API}/${id}`);
  }

  update(customerDto: CustomerDto): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${API}/update/${customerDto.id}`, customerDto);
  }
}
