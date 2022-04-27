import { LoginGuard } from './shared/guard/login.guard';
import { ForbiddenComponent } from './shared/widgets/forbidden/forbidden.component';
import { SupplierComponent } from './master/supplier/supplier.component';
import { AdminHomeComponent } from './public/home/admin-home/admin-home.component';
import { PasswordSettingComponent } from './security/user-profile/password-setting/password-setting.component';
import { HomeComponent } from './public/home/home.component';
import { SignUpComponent } from './security/sign-up/sign-up.component';
import { LoginComponent } from './security/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './security/user-profile/user-profile.component';
import { AdminGuard } from './shared/guard/admin.guard';
import { EmployeeGuard } from './shared/guard/employee.guard';

const routes: Routes = [
  {
    path: 'admin-home',
    component: AdminHomeComponent,
    canActivate: [AdminGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'user-profile/password',
    component: PasswordSettingComponent,
    canActivate: [LoginGuard],
  },
  { path: 'public-home', component: HomeComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'forbidden', component: ForbiddenComponent },
  {
    path: 'master',
    loadChildren: () =>
      import('./master/master.module').then((m) => m.MasterModule),
  },
  {
    path: 'transaction',
    loadChildren: () =>
      import('./transaction/transaction.module').then(
        (m) => m.TransactionModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
