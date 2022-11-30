import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { NotifierService } from 'src/app/services/notifier/notifier.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormSubmitted: boolean = false;
  loginFormSubmitting: boolean = false
  loginForm!: FormGroup


  constructor(
    private notifierService: NotifierService,
    private router: Router,
    private apiService: ApiService,
    private _FormBuilder: FormBuilder,
    private _NotifierService: NotifierService,

  ) {
    this.loginForm = this._FormBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z.]{2,5}$/)]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {



  }

  login() {
    this.loginFormSubmitted = true
    if (this.loginForm.valid) {
      this.loginFormSubmitting = true;

      let data = this.loginForm.getRawValue()
      console.log(data);
      this.loginForm.reset();
    }




  }
}
