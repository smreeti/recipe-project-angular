import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
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
      .pipe(catchError(errorResponse => {
        console.log('sign up error:::', errorResponse);
        let errorMsg = 'An unknown error occured';

        switch (errorResponse.error.error.errors[0].message) {
          case 'EMAIL_EXISTS':
            errorMsg = 'This email exists already';

        }
        return throwError(errorMsg);
      }));
  }
}
