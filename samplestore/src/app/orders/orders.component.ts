import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  showOrderCreateForm: boolean = false;
  isLoading: boolean = false;
  myOrders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.orderService.getMyOrders().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.myOrders = res.body.data;
      },
      error: (err) => {
        this.isLoading = true;
        console.log(err);
      },
    });
  }

  formatDate(dt: string) {
    const date = new Date(dt);
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    return formattedDate;
  }

  closeCreateOrderForm() {
    this.showOrderCreateForm = false;
    this.ngOnInit();
  }

  openCreateOrderForm() {
    this.showOrderCreateForm = true;
  }
}
