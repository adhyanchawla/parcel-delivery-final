import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showRegistrationForm: boolean = false;
  loginError: boolean = false;
  isLoading: boolean = false;
  error: string[] = [];

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('');
    }
  }

  toggleRegistrationForm() {
    this.showRegistrationForm = !this.showRegistrationForm;
  }

  onLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    const loginService = this.authService;
    loginService
      .authenticateUser({
        email: form.value.userEmail,
        password: form.value.userPassword,
      })
      .subscribe({
        next: (res) => {
          loginService.setJWTToken(res.body.token);
          this.isLoading = false;
          this.router.navigateByUrl('');
        },
        error: (err) => {
          this.error.push(err.error.data);
          this.error.push(err.error.data);
          this.isLoading = false;
        },
      });
    form.reset();
  }

  onRegister(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    const registerService = this.authService;
    registerService
      .registerUser({
        newUserEmail: form.value.newUserEmail,
        newUserPassword: form.value.newUserPassword,
      })
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          this.toggleRegistrationForm();
        },
        error: (err) => {
          this.isLoading = false;
        },
      });
    form.reset();
  }

  closeError() {
    this.error = [];
  }
}
