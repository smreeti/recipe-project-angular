import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('Spagetthi', 'This is Spagetthi',
      'https://www.thewholesomedish.com/wp-content/uploads/2020/08/THE-BEST-CLASSIC-SPAGHETTI-600X900.jpg'),
    new Recipe('Momos', 'This is Momo',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpCQixzITHVHtn8kYQQ2oRsiexqn-Fu7dIeQ&usqp=CAU')
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  onRecipeSelected = (recipe: Recipe) => {
    this.recipeWasSelected.emit(recipe);
  }

}
