import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Subject, throwError} from 'rxjs';
import {User} from './user.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new Subject<User>();

  constructor(private http: HttpClient) {

  }

  signUp = (email: string, password: string) => {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyClT2L0B5I78DjVS24J8fB2aKE4R5mmBt0',
      {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(catchError(this.handleError),
        tap(response => {
          this.handleAuthentication(response);
        }));
  };

  login = (email: string, password: string) => {
    return this.http.post<AuthResponseData>
    ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyClT2L0B5I78DjVS24J8fB2aKE4R5mmBt0',
      {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(catchError(this.handleError),
        tap(response => {
          this.handleAuthentication(response);
        }));
  };

  private handleError = (errorResponse: HttpErrorResponse) => {
    console.log('sign up error:::', errorResponse);
    let errorMsg = 'An unknown error occured';

    switch (errorResponse.error.error.errors[0].message) {
      case 'EMAIL_EXISTS':
        errorMsg = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg = 'This email does not exists';
        break;

    }
    return throwError(errorMsg);
  };

  private handleAuthentication = (response) => {
    const {email, localId, idToken, expiresIn} = response;

    const expirationDate: Date = new Date(
      new Date().getTime() + +expiresIn * 10000);
    const user = new User(
      email,
      localId,
      idToken,
      expirationDate);
    this.user.next(user);
  };
}
