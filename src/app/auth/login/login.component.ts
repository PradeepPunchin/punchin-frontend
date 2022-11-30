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
    private formBuilder: FormBuilder,
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
    }
    console.log(this.loginForm.value);
    this.loginForm.reset();
  }
}
