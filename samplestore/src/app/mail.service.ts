import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  constructor(private http: HttpClient) {}

  sendOTP() {
    let token = this.getAuthToken();
    if (!token) {
      token = '';
      console.log('Empty Token');
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<any>(
      'http://localhost:3000/mail/send-otp',
      {},
      {
        headers: headers,
        observe: 'response',
      }
    );
  }

  private getAuthToken() {
    const authToken = localStorage.getItem('userAccessToken');
    return authToken;
  }
}
