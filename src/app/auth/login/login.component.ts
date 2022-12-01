import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { NotifierService } from 'src/app/services/notifier/notifier.service';
import { ROLES } from 'src/app/models/enums/index';
import { SessionService } from 'src/app/services/session/session.service';
import { ThisReceiver } from '@angular/compiler';


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

  constructor(
    private notifierService: NotifierService,
    private router: Router,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private sessionServive: SessionService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userId: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  login() {
    let userId = this.loginForm.controls['userId'].value;
    let password = this.loginForm.controls['password'].value;
    this.loginFormSubmitted = true
    if (this.loginForm.valid) {
      this.loginFormSubmitting = true;
      let body = {
        "userId": userId,
        "password": password
      }
      this.apiService.login(body).subscribe((res: any) => {
        if (res && res.isSuccess) {
          this.loginFormSubmitting = false;
          this.loginForm.reset();
          this.sessionServive.setSessions({ token: res.data.authToken });
          this.sessionServive.setSessions({ role: res.data.user.role });
          this.sessionServive.setSessions({ userId: res.data.user.userId });
          this.router.navigate(['/pages']);
          this.notifierService.showSuccess("login Successful")
        }
      }, (error: any) => {
        this.notifierService.showError(error.error.message);
        this.loginFormSubmitting = false;
      })
    }
  }

  onClick1(input_field_password: any) {
    if (input_field_password.type == "password") {
      input_field_password.type = "text";
      this.show1 = !this.show1;
    } else {
      input_field_password.type = "password";
      this.show1 = !this.show1;
    }
  }
}
