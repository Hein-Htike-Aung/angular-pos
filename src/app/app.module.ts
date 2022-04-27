import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MasterModule } from './master/master.module';
import { AdminHomeComponent } from './public/home/admin-home/admin-home.component';
import { HomeComponent } from './public/home/home.component';
import { PublicModule } from './public/public.module';
import { LoginComponent } from './security/login/login.component';
import { SignUpComponent } from './security/sign-up/sign-up.component';
import { CustomerProfileComponent } from './security/user-profile/customer-profile/customer-profile.component';
import { EmployeeProfileComponent } from './security/user-profile/employee-profile/employee-profile.component';
import { PasswordSettingComponent } from './security/user-profile/password-setting/password-setting.component';
import { UserProfileComponent } from './security/user-profile/user-profile.component';
import { TokenInterceptor } from './shared/interceptor/token.interceptor';
import { SharedModule } from './shared/shared.module';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    UserProfileComponent,
    EmployeeProfileComponent,
    CustomerProfileComponent,
    PasswordSettingComponent,
    AdminHomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot(),
    MasterModule,
    SharedModule,
    PublicModule,
    FormsModule,
    GoogleChartsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
