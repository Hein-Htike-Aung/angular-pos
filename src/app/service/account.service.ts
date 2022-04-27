import {
  ApiResponse,
  CredentialInfo,
  CustomerDto,
  EmployeeDto,
  LoginRequestPayload,
  LoginResponse,
  UserResponse,
} from './../model/app.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API = `${environment.apiUrl}/account`;

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  @Output() loggedInEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() usernameEvent: EventEmitter<string> = new EventEmitter();
  @Output() userRoleEvent: EventEmitter<string> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.http
      .post<LoginResponse>(`${API}/login`, loginRequestPayload)
      .pipe(
        map((resp) => {
          this.localStorage.store(
            'authenticationToken',
            resp.authenticationToken
          );
          this.localStorage.store('role', resp.role);
          this.localStorage.store('expiresAt', resp.expiresAt);
          this.localStorage.store('username', resp.username);

          this.loggedInEvent.emit(true);
          this.usernameEvent.emit(resp.username);
          this.userRoleEvent.emit(resp.role);

          return true;
        })
      );
  }

  currentUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${API}/${this.getUsername()}`);
  }

  signUpCustomer(customerDto: CustomerDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${API}/signup/customer`, customerDto);
  }

  signUpEmployee(employeeDto: EmployeeDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${API}/signup/employee`, employeeDto);
  }

  changeCredential(credentialInfo: CredentialInfo) {
    return this.http.put(`${API}/change-credential`, credentialInfo);
  }

  blockAccount(username: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${API}/block/${username}`);
  }

  logout() {
    this.http.get<ApiResponse>(`${API}/logout`).subscribe({
      next: (resp) => console.log(resp),
      error: (error) => console.log(error),
    });

    // Refresh navigation
    this.loggedInEvent.emit(false);
    this.usernameEvent.emit('');
    this.userRoleEvent.emit('');

    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('expiresAt');
    this.localStorage.clear('role');
  }

  public isLoggedIn() {
    return this.getJwtToken() !== null;
  }

  public getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  public getUsername() {
    return this.localStorage.retrieve('username');
  }

  public getUserRole() {
    return this.localStorage.retrieve('role');
  }
  public getExpiresAt() {
    return this.localStorage.retrieve('expiresAt');
  }
}
