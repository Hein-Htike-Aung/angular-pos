import { ErrorProvider } from './../../../shared/provider/error.provider';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/service/account.service';
import { CredentialInfo, UserResponse } from './../../../model/app.model';

@Component({
  selector: 'app-password-setting',
  templateUrl: './password-setting.component.html',
  styleUrls: ['./password-setting.component.scss'],
})
export class PasswordSettingComponent implements OnInit {
  credentialInfo: CredentialInfo;
  credentailForm: FormGroup;
  loggedInUser: UserResponse;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
    private builder: FormBuilder
  ) {
    this.credentialInfo = {
      email: '',
      oldPassword: '',
      newPassword: '',
    };
  }

  ngOnInit(): void {
    this.credentailForm = this.builder.group({
      email: ['', [Validators.required, Validators.required]],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      repeatedPassword: ['', Validators.required],
    });

    this.accountService.currentUser().subscribe((resp) => {
      this.loggedInUser = resp;
      this.credentailForm.patchValue({
        email: this.loggedInUser.email,
      });
    });
  }

  changeCredentail() {
    const newP = this.credentailForm.get('newPassword').value;
    const repeatedP = this.credentailForm.get('repeatedPassword').value;

    if (repeatedP !== newP) {
      this.toastr.error('Password does not match');
      return;
    }

    this.credentialInfo.email = this.credentailForm.get('email').value;
    this.credentialInfo.oldPassword =
      this.credentailForm.get('oldPassword').value;
    this.credentialInfo.newPassword = newP;

    this.accountService.changeCredential(this.credentialInfo).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('');
        this.toastr.success('Successfully updated. Verify by checking email and login Again');
        this.accountService.logout();
      },
      error: (error: HttpErrorResponse) => {    
        console.log(error);  
        this.toastr.error(error.error?.message);
      },
    });
  }
}
