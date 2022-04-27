import {
  EmployeeUpdateRequestPayload,
  ApiResponse,
} from './../model/app.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EmployeeDto } from '../model/app.model';

const API = `${environment.apiUrl}/employee`;

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<EmployeeDto[]> {
    return this.http.get<EmployeeDto[]>(`${API}/list`);
  }

  getById(id: number): Observable<EmployeeDto> {
    return this.http.get<EmployeeDto>(`${API}/${id}`);
  }

  getByUserId(userId: number): Observable<EmployeeDto> {
    return this.http.get<EmployeeDto>(`${API}/by-user/${userId}`);
  }

  update(
    employeeUpdateRequestPayload: EmployeeUpdateRequestPayload
  ): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(
      `${API}/update/${employeeUpdateRequestPayload.id}`,
      employeeUpdateRequestPayload
    );
  }
}
