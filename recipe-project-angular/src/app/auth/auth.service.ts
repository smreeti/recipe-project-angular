import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {User} from './user.model';
import {Router} from '@angular/router';

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
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient,
              private router: Router) {

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
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, localId, idToken, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }


  logout = () => {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  };

  autoLogin = () => {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  };

  autoLogout = (expirationDuration: number) => {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  };

}
