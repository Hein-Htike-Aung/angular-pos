import { UserRole } from './../../enummeration/app.enum';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/service/account.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerGuard implements CanActivate {
  constructor(
    private accountService: AccountService,
    private rounter: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.accountService.getUserRole() === UserRole.ROLE_CUSTOMER && this.accountService.isLoggedIn()) {
      return true;
    } else {
      this.rounter.navigateByUrl('/forbidden');
    }

    return true;
  }
}
