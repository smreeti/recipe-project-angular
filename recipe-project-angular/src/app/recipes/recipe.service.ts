import {Recipe} from './recipe.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list-service';

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(1,
      'Spagetthi',
      'This is Spagetthi',
      'https://www.thewholesomedish.com/wp-content/uploads/2020/08/THE-BEST-CLASSIC-SPAGHETTI-600X900.jpg',
      [
        new Ingredient('Noodles', 1),
        new Ingredient('Pasta Sauce', 1)
      ]),
    new Recipe(2,
      'Momos',
      'This is Momo',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpCQixzITHVHtn8kYQQ2oRsiexqn-Fu7dIeQ&usqp=CAU',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Flour', 1)
      ])
  ];
  recipeSelected = new EventEmitter<Recipe>();
  recipeChanged = new EventEmitter<Recipe[]>();

  constructor(private shoppingService: ShoppingListService) {
  }

  getRecipes = () => {
    return this.recipes.slice();
  };

  addIngredientToShoppingList = (ingredient: Ingredient[]) => {
    this.shoppingService.addIngredients(ingredient);
  };

  getRecipe = (index: number) => {
    return this.recipes[index];
  };

  addRecipe = (recipe: Recipe) => {
    this.recipes.push(recipe);
    this.recipeChanged.emit(this.recipes.slice());
  }
}
