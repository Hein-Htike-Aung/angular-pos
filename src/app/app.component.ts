import { LocalStorageService } from 'ngx-webstorage';
import { Component, HostListener, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'pos-app';
  
  constructor(private localStorage: LocalStorageService) {}

  // @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    // this.localStorage.clear('authenticationToken');
    // this.localStorage.clear('username');
    // this.localStorage.clear('expiresAt');
    // this.localStorage.clear('role');
  }
}
