import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { MailService } from '../mail.service';

@Component({
  selector: 'app-verifyuser',
  templateUrl: './verifyuser.component.html',
  styleUrls: ['./verifyuser.component.scss'],
})
export class VerifyuserComponent implements OnInit {
  @Output() onCloseForm = new EventEmitter();
  isLoading: boolean = false;

  constructor(
    private mailService: MailService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.mailService.sendOTP().subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log(res);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }

  onClose() {
    this.onCloseForm.emit(false);
  }

  onVerify(form: NgForm) {
    this.isLoading = true;
    const OTP = {
      userOTP: form.value.OTP,
    };
    this.authService.verifyUser(OTP).subscribe({
      next: (res) => {
        this.isLoading = false;
        localStorage.setItem('isVerified', 'true');
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }
}
