import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'recipe-project-angular';
  loadedFeature = 'recipe';

  ngOnInit(): void {
    console.log('called:::::::');
  }

  onNavigate = (feature: string) => {
    this.loadedFeature = feature;
  }

}
