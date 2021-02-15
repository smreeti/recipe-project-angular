import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log('user1', !user);
      console.log('user2', !!user);
      console.log(' this.isAuthenticated',  this.isAuthenticated);
      console.log(' this.isAuthenticated',  this.isAuthenticated);
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }


}
