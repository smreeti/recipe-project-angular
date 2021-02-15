import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = false;
  authForm: FormGroup;
  error: null;

  constructor(private authService: AuthService,
              private router: Router) {
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

    let authObs: Observable<AuthResponseData>;

    authObs = this.isLoginMode ? this.authService.login(email, password) : this.authService.signUp(email, password);

    authObs.subscribe(response => {
        console.log('sign up response:::', response);
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log('sign up error:::', errorMessage);
        this.error = errorMessage;
      });

    this.authForm.reset();
  };
}
