import {Recipe} from './recipe.model';
import {EventEmitter} from '@angular/core';

export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('Spagetthi', 'This is Spagetthi',
      'https://www.thewholesomedish.com/wp-content/uploads/2020/08/THE-BEST-CLASSIC-SPAGHETTI-600X900.jpg'),
    new Recipe('Momos', 'This is Momo',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpCQixzITHVHtn8kYQQ2oRsiexqn-Fu7dIeQ&usqp=CAU')
  ];
  recipeSelected = new EventEmitter<Recipe>();
  getRecipes = () => {
    return this.recipes.slice();
  }
}
