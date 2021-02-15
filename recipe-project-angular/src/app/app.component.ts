import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'recipe-project-angular';
  // loadedFeature = 'recipe';
  constructor(private authService: AuthService){}

  ngOnInit(): void {
    console.log('AppComponent-ngOnInit called:::::::');
    this.authService.autoLogin();
  }

  // onNavigate = async (feature: string) => {
  //    this.loadedFeature = feature;
  // }

}
