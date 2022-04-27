import { Observable } from 'rxjs';
import {
  OrderRequestPayload,
  ApiResponse,
  OrderResponse,
  OrderDetialsResponse,
} from './../model/app.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = `${environment.apiUrl}/order`;

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  create(orderRequestPayload: OrderRequestPayload): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${API}/create`, orderRequestPayload);
  }

  confirm(orderId: number) {
    return this.http.get<ApiResponse>(`${API}/confirm/${orderId}`);
  }

  getAll(): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(`${API}/list`);
  }

  getById(id: number): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${API}/${id}`);
  }

  getOrderDetailsForOrder(orderId: number): Observable<OrderDetialsResponse[]> {
    return this.http.get<OrderDetialsResponse[]>(
      `${API}/order-details/by-order/${orderId}`
    );
  }

  getOrdersForCustomer(customerId: number): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(`${API}/by-customer/${customerId}`);
  }
}
