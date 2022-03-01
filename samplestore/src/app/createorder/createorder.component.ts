import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-createorder',
  templateUrl: './createorder.component.html',
  styleUrls: ['./createorder.component.scss'],
})
export class CreateorderComponent implements OnInit {
  @Output() onCloseForm = new EventEmitter();
  isLoading: boolean = false;
  fromData: any;
  estimateAmount?: number;
  stepNo: number = 1;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {}

  onClose() {
    this.onCloseForm.emit();
  }

  onReviewAndPay(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    this.fromData = form.value;
    this.stepNo = 2;
    form.reset();
    this.orderService.estimatePrice('').subscribe({
      next: (res) => {
        this.isLoading = false;
        this.estimateAmount = res.body.data;
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }

  onCreateOrder() {
    this.isLoading = true;
    this.fromData.amount = this.estimateAmount;
    this.orderService.createNewOrder(this.fromData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.onClose();
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }

  reEstimatePrice(couponCode: string) {
    this.isLoading = true;
    this.orderService.estimatePrice(couponCode).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.estimateAmount = res.body.data;
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }
}
