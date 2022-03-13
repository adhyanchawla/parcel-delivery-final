import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}

  private tokenExpirationTimer: any;

  authenticateUser(userCredentials: { email: string; password: string }) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(
      'http://localhost:3000/users/login',
      JSON.stringify(userCredentials),
      { headers, observe: 'response' }
    );
  }

  deauthenticateUser() {
    this.removeJWTToken();
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigateByUrl('/login');
  }

  registerUser(newUserCredentials: {
    newUserEmail: string;
    newUserPassword: string;
  }) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(
      'http://localhost:3000/users/register',
      JSON.stringify(newUserCredentials),
      { headers, observe: 'response' }
    );
  }

  setJWTToken(token: string) {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    const expirationDuration = (decodedToken.exp - decodedToken.iat) * 1000;
    localStorage.setItem('isVerified', decodedToken.isVerified);
    localStorage.setItem('isProfileComplete', decodedToken.isProfileComplete);
    this.autoLogout(expirationDuration);
    localStorage.setItem('userAccessToken', token);
  }

  private autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.deauthenticateUser();
    }, expirationDuration);
  }

  private removeJWTToken() {
    localStorage.removeItem('userAccessToken');
    localStorage.clear();
  }

  isLoggedIn() {
    const helper = new JwtHelperService();
    const token = localStorage.getItem('userAccessToken');
    if (token) {
      const isExpired = helper.isTokenExpired(token);
      if (isExpired) {
        this.deauthenticateUser();
      }
      return !isExpired;
    } else {
      return false;
    }
  }

  isVerified() {
    const status = localStorage.getItem('isVerified');
    if (status) {
      if (status === 'true') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  isProfileComplete() {
    const status = localStorage.getItem('isProfileComplete');
    if (status) {
      if (status === 'true') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  private getAuthToken() {
    const authToken = localStorage.getItem('userAccessToken');
    return authToken;
  }

  verifyUser(OTP: { userOTP: string }) {
    let token = this.getAuthToken();
    if (!token) {
      token = '';
      console.log('Empty Token');
    }
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<any>('http://localhost:3000/users/verify-user', OTP, {
      headers: headers,
      observe: 'response',
    });
  }

  updateUserProfile(data: any) {
    let token = this.getAuthToken();
    if (!token) {
      token = '';
      console.log('Empty Token');
    }
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'application/json');
    return this.http.post<any>(
      'http://localhost:3000/users/update-user-profile',
      JSON.stringify(data),
      {
        headers: headers,
        observe: 'response',
      }
    );
  }

  getUserData() {
    let token = this.getAuthToken();
    if (!token) {
      token = '';
      console.log('Empty Token');
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<any>('http://localhost:3000/users/get-user-data', {
      headers: headers,
      observe: 'response',
    });
  }
}
