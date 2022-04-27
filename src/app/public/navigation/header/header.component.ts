import { OrderRequestProvider } from './../../../shared/provider/order-request.provider';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  username: string;
  userRole: string;
  isLoggedIn: boolean;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private orderRequestProvider: OrderRequestProvider
  ) {
    this.isLoggedIn = this.accountService.isLoggedIn();
    this.username = this.accountService.getUsername();
    this.userRole = this.accountService.getUserRole();
  }

  ngOnInit(): void {}

  goToUserProfile() {
    if (this.userRole !== 'ROLE_ADMIN') {
      this.router.navigateByUrl('/user-profile');
    }
  }

  getCartCount() {
    return this.orderRequestProvider.cartCount;
  }

  logout() {
    this.accountService.logout();
    this.isLoggedIn = false;
    this.username = '';
    this.userRole = '';
    this.router.navigateByUrl('/');
  }
}
