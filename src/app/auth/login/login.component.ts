import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { NotifierService } from 'src/app/services/notifier/notifier.service';
import { STORAGETOKENENUM, USERSTATUS } from 'src/app/models/enums/index';
import { SessionService } from 'src/app/services/session/session.service';
import { ApiResponse } from 'src/app/models/common';
import { ILoginResponse } from 'src/app/models/response/auth.response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormSubmitted: boolean = false;
  loginFormSubmitting: boolean = false
  loginForm!: FormGroup
  password1: any
  show1 = false;
  a_password: string = '';
  isPasswordVisible: boolean = false;

  constructor(
    private notifierService: NotifierService,
    private router: Router,
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {
    if(localStorage.getItem(STORAGETOKENENUM.token)) {
      this.router.navigate(['/pages'])
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userId: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  login() {
    this.loginFormSubmitted = true
    if (this.loginForm.valid) {
      this.loginFormSubmitting = true;
      this.apiService.login({
        userId: this.loginForm.value.userId,
        password: this.loginForm.value.password
      }).subscribe((res: ApiResponse<ILoginResponse> | any) => {
        if (res?.isSuccess) {
          this.loginFormSubmitting = false;
          if(res?.data) {
            if(res?.data?.user?.accountLocked) {
              this.notifierService.showError('Account Locked');
              return;
            }
            if(res?.data?.user?.status === USERSTATUS.inactive) {
              this.notifierService.showError('Account not active');
              return;
            }
            localStorage.setItem(STORAGETOKENENUM.token, res?.data?.authToken);
            localStorage.setItem(STORAGETOKENENUM.userId, res?.data?.user?.userId);
            localStorage.setItem(STORAGETOKENENUM.role, res?.data?.user?.role)
            this.router.navigate(['/pages']);
            this.loginForm.reset();
            this.notifierService.showSuccess(res?.message || "Success");
          }
        }
      }, (error: any) => {
        this.notifierService.showError(error.error.message);
        this.loginFormSubmitting = false;
      })
    } else {
      this.notifierService.showError('Invalid Data');
    }
  }

  togglePassword(inputFieldPassword: any) {
    
    if (inputFieldPassword.type == "password") {
      inputFieldPassword.type = "text";
      this.show1 = !this.show1;
    } else {
      inputFieldPassword.type = "password";
      this.show1 = !this.show1;
    }
  }
}
