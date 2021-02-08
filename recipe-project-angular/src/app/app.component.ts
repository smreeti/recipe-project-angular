import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'recipe-project-angular';
  // loadedFeature = 'recipe';

  ngOnInit(): void {
    console.log('AppComponent-ngOnInit called:::::::');
  }

  // onNavigate = async (feature: string) => {
  //    this.loadedFeature = feature;
  // }

}
