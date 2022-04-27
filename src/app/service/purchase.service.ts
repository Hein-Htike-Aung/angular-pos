import { InstantDatePipe } from './../shared/pipe/instant-date.pipe';
import { Observable } from 'rxjs';
import {
  ApiResponse,
  PurchaseDetialsResponse,
  PurchaseRequestPayload,
  PurchaseResponse,
} from './../model/app.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = `${environment.apiUrl}/purchase`;

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  constructor(private http: HttpClient) {}

  create(
    purchaseRequestPayload: PurchaseRequestPayload
  ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${API}/create`, purchaseRequestPayload);
  }

  getById(id: number): Observable<PurchaseResponse> {
    return this.http.get<PurchaseResponse>(`${API}/${id}`);
  }

  getAll(): Observable<PurchaseResponse[]> {
    return this.http.get<PurchaseResponse[]>(`${API}/list`);
  }

  getPurchaseDetailsByPurchaseId(
    id: number
  ): Observable<PurchaseDetialsResponse[]> {
    return this.http.get<PurchaseDetialsResponse[]>(
      `${API}/purchase-details/by-purchase/${id}`
    );
  }
}
