import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  isLoginMode = true;
  authForm: FormGroup;
  error: null;

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSwitchMode = () => {
    this.isLoginMode = !this.isLoginMode;
  };

  onSubmit = ($event) => {
    $event.preventDefault();

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
