import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  private getAuthToken() {
    const authToken = localStorage.getItem('userAccessToken');
    return authToken;
  }

  createNewOrder(orderObject: any) {
    let token = this.getAuthToken();
    if (!token) {
      token = '';
      console.log('Empty Token');
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<any>(
      'http://localhost:3000/orders/create-order',
      orderObject,
      {
        headers: headers,
        observe: 'response',
      }
    );
  }

  estimatePrice(couponCode: string) {
    let token = this.getAuthToken();
    if (!token) {
      token = '';
      console.log('Empty Token');
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<any>(
      'http://localhost:3000/orders/estimate-price',
      { couponCode: couponCode },
      {
        headers: headers,
        observe: 'response',
      }
    );
  }

  getMyOrders() {
    let token = this.getAuthToken();
    if (!token) {
      token = '';
      console.log('Empty Token');
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<any>('http://localhost:3000/orders/my-orders', {
      headers: headers,
      observe: 'response',
    });
  }

  getOrderDetails(id: string) {
    let token = this.getAuthToken();
    if (!token) {
      token = '';
      console.log('Empty Token');
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<any>(
      `http://localhost:3000/orders/order-details/${id}`,
      {
        headers: headers,
        observe: 'response',
      }
    );
  }
}
