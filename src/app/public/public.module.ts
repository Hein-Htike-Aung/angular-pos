import { GoogleChartsModule } from 'angular-google-charts';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button/button-module';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SideBarComponent } from './navigation/side-bar/side-bar.component';

@NgModule({
  declarations: [SideBarComponent, HeaderComponent],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    MatIconModule,
    GoogleChartsModule
  ],
  exports: [SideBarComponent, HeaderComponent],
})
export class PublicModule {}
