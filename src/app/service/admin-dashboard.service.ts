import { Observable } from 'rxjs';
import { ApiResponse } from './../model/app.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

const API = `${environment.apiUrl}/dashboard`;

@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {
  constructor(private http: HttpClient) {}

  getMonthlyExpenses(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${API}/monthly/expenses`);
  }

  getMonthlyIncomes(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${API}/monthly/incomes`);
  }

  getCurrentMonthExpenses(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${API}/current-month/expenses`);
  }

  getCurrentMonthIncomes(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${API}/current-month/incomes`);
  }

  getProductsTotalQuantityByCategory(
    categoryId: number
  ): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      `${API}/product-quantity/by-category/${categoryId}`
    );
  }
}
