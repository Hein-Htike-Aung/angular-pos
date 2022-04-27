import { UserRole } from './../../../enummeration/app.enum';
import { AccountService } from './../../../service/account.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss'],
})
export class ForbiddenComponent implements OnInit {
  userRole = '';

  constructor(private router: Router, private accountService: AccountService) {
    this.userRole = this.accountService.getUserRole();
  }

  ngOnInit(): void {}

  goToHome() {
    if (this.userRole === UserRole.ROLE_ADMIN) {
      // dashboard
      this.router.navigateByUrl('/admin-home');
    } else if (this.userRole === UserRole.ROLE_EMPLOYEE) {
      // Employee's Home
      this.router.navigateByUrl('/master/product/list');
    } else {
      // public home
      this.router.navigateByUrl('/public-home');
    }
  }
}
