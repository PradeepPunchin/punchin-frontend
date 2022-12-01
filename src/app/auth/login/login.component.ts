import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { NotifierService } from 'src/app/services/notifier/notifier.service';
import { ROLES } from 'src/app/models/enums/index';
import { SessionService } from 'src/app/services/session/session.service';


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
    this.loginFormSubmitted = true
    if (this.loginForm.valid) {
      this.loginFormSubmitting = true;
      this.router.navigate(['/pages']);
    }
    console.log(this.loginForm.value);
    // this.loginForm.reset();

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
