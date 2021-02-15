import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = false;
  authForm: FormGroup;
  error: null;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSwitchMode = () => {
    this.isLoginMode = !this.isLoginMode;
  };

  onSubmit = () => {
    if (!this.authForm.valid) {
      return;
    }
    const {email, password} = this.authForm.value;

    if (this.isLoginMode) {
    } else {

      this.authService.signUp(email, password).subscribe(response => {
          console.log('sign up response:::', response);
        },
        errorMessage => {
          console.log('sign up error:::', errorMessage);
          this.error = errorMessage;
        });
    }
    this.authForm.reset();
  };
}
