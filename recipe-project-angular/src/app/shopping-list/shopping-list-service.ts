import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

export class ShoppingListService {

  ingredients: Ingredient[] = [
    new Ingredient('Tomato', 50),
    new Ingredient('Onion', 30)
  ];
  ingredientChanged = new Subject<Ingredient[]>();
  /*making copy of the original ingredients array*/
  getIngredients = () => {
    return this.ingredients.slice();
  }

  addIngredient = (ingredient: Ingredient) => {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients = (ingredient: Ingredient[]) => {
    this.ingredients.push(...ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}

