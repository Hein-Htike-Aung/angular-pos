import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';

declare var $: any;

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  userRole: string;
  username: string;

  constructor(private accountService: AccountService, private router: Router) {
    this.userRole = this.accountService.getUserRole();
    this.username = this.accountService.getUsername();
  }

  ngOnInit(): void {}

  showMemberDropDown() {
    $('.member-show').slideToggle('show');
    $('.first').toggleClass('rotate');
  }

  showMasterDropDown() {
    $('.master-show').slideToggle('show');
    $('.second').toggleClass('rotate');
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  goToUserProfile() {
    if (this.userRole !== 'ROLE_ADMIN') {
      this.router.navigateByUrl('/user-profile');
    }
  }

  triggerMemberDropDown() {
    $('.member-show').addClass('show');
  }

  triggerMasterDropDown() {
    $('.master-show').addClass('show');
  }
}
