import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}
  isVerified?: boolean;
  isProfileComplete?: boolean;
  userVerifyFormStatus: boolean = false;
  isLoading: boolean = false;
  userData: any;

  ngOnInit(): void {
    this.isLoading = true;
    this.isVerified = this.authService.isVerified();
    this.isProfileComplete = this.authService.isProfileComplete();
    this.authService.getUserData().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.userData = res.body.data;
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }

  toggleUserVerifyForm() {
    this.userVerifyFormStatus = !this.userVerifyFormStatus;
  }

  updateProfile(form: NgForm) {
    this.isLoading = true;
    this.authService.updateUserProfile(form.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.ngOnInit();
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }
}
