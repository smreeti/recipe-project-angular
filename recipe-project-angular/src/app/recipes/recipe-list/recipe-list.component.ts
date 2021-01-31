import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('Spagetthi', 'This is Spagetthi',
      'https://www.thewholesomedish.com/wp-content/uploads/2020/08/THE-BEST-CLASSIC-SPAGHETTI-600X900.jpg'),
    new Recipe('Spagetthi', 'This is Spagetthi',
      'https://www.thewholesomedish.com/wp-content/uploads/2020/08/THE-BEST-CLASSIC-SPAGHETTI-600X900.jpg')
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
