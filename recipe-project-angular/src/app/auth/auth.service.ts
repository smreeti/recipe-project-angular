import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

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
      .pipe(catchError(this.handleError));
  };

  login = (email: string, password: string) => {
    return this.http.post<AuthResponseData>
    ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyClT2L0B5I78DjVS24J8fB2aKE4R5mmBt0',
      {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(catchError(this.handleError));
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
}
