import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-trackpackage',
  templateUrl: './trackpackage.component.html',
  styleUrls: ['./trackpackage.component.scss'],
})
export class TrackpackageComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) {}
  isLoading: boolean = false;
  detailStep = 1;
  private orderId?: string;
  orderData: any;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      this.orderId = parameter['orderId'];
    });
    if (this.orderId) {
      this.isLoading = true;
      this.orderService.getOrderDetails(this.orderId).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.orderData = res.body.data;
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
        },
      });
    }
  }
  packageDetails() {
    this.detailStep = 1;
  }

  pickUpDetails() {
    this.detailStep = 2;
  }

  dropOffDetails() {
    this.detailStep = 3;
  }

  pricingDetails() {
    this.detailStep = 4;
  }
}
