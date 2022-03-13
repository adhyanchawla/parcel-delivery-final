import { HttpClient } from '@angular/common/http';
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
  formData: any;
  estimateAmount?: number;
  stepNo: number = 1;
  fileToUpload: any;
  imageUrl: any;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  onClose() {
    this.onCloseForm.emit();
  }

  onReviewAndPay(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    this.formData = form.value;
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
    this.formData.amount = this.estimateAmount;

    // Handling the image data.
    const imageData = new FormData();
    imageData.append('image', this.fileToUpload);

    // First uploading image to backend.
    this.orderService.uploadParcelImage(imageData).subscribe({
      next: (res) => {
        // Displaying the response
        const imageUrl = res.data.slice(2);
        this.formData.imageUrl = imageUrl;
        // If image is uploaded succefully then create the order.
        this.orderService.createNewOrder(this.formData).subscribe({
          next: (res) => {
            this.isLoading = false;
            this.onClose();
          },
          error: (err) => {
            this.isLoading = false;
            console.log(err);
          },
        });
      },
      error: (err) => {
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

  handleFileInput(event: any) {
    const reader = new FileReader();
    this.fileToUpload = event.target.files[0];
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
  }

  onClear(parcelImage: HTMLInputElement) {
    this.imageUrl = null;
  }
}
