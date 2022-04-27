import { AccountService } from './../../service/account.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, switchMap, take, filter } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.indexOf('login') !== -1) {
      return next.handle(request);
    }

    const jwtToken = this.accountService.getJwtToken();

    if (jwtToken) {
      return next.handle(this.addToken(request, jwtToken));
    }

    return next.handle(request);
  }

  addToken(request: HttpRequest<any>, jwtToken: string) {
    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + jwtToken),
    });
  }
}
