import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'samplestore';
  navbarStatus: boolean = false; // False indicates that the navbar is closed and true indicates the opposite.

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  openNavbar = () => {
    // Function to open the side navbar.
    this.navbarStatus = !this.navbarStatus;
  };

  closeNavbar = () => {
    // Function to close the side navbar.
    this.navbarStatus = !this.navbarStatus;
  };

  onLogout() {
    // Function to logout the user.
    this.authService.deauthenticateUser();
  }

  isLoggedIn() {
    let res = this.authService.isLoggedIn();
    return res;
  }
}
