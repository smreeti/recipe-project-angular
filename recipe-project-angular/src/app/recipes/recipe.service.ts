import {Recipe} from './recipe.model';
import {EventEmitter} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';

export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('Spagetthi',
      'This is Spagetthi',
      'https://www.thewholesomedish.com/wp-content/uploads/2020/08/THE-BEST-CLASSIC-SPAGHETTI-600X900.jpg',
      [
        new Ingredient('Noodles', 1),
        new Ingredient('Pasta Sauce', 1)
      ]),
    new Recipe('Momos',
      'This is Momo',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpCQixzITHVHtn8kYQQ2oRsiexqn-Fu7dIeQ&usqp=CAU',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Flour', 1)
      ])
  ];
  recipeSelected = new EventEmitter<Recipe>();
  getRecipes = () => {
    return this.recipes.slice();
  }
}
