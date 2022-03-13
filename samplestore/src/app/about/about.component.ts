import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  fileToUpload: any;
  imageUrl: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  // handleFileInput(event: any) {
  //   const reader = new FileReader();
  //   this.fileToUpload = event.target.files[0];
  //   reader.readAsDataURL(this.fileToUpload);
  //   reader.onload = (event: any) => {
  //     this.imageUrl = event.target.result;
  //   };
  // }

  // onSubmit() {
  //   const formData = new FormData();
  //   formData.append('image', this.fileToUpload);

  //   this.http
  //     .post<any>('http://localhost:3000/orders/upload-parcel-image', formData)
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //       },
  //       error: (err) => {
  //         console.log(err);
  //       },
  //     });
  // }

  // onClear(parcelImage: HTMLInputElement) {
  //   this.imageUrl = null;
  //   parcelImage.value = '';
  // }
}
