import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter} from '@angular/core';

export class ShoppingListService {

  ingredients: Ingredient[] = [
    new Ingredient('Tomato', 50),
    new Ingredient('Onion', 30)
  ];
  ingredientChanged = new EventEmitter<Ingredient[]>();
  /*making copy of the original ingredients array*/
  getIngredients = () => {
    return this.ingredients.slice();
  }

  addIngredient = (ingredient: Ingredient) => {
    this.ingredients.push(ingredient);
    this.ingredientChanged.emit(this.ingredients.slice());
  }

  addIngredients = (ingredient: Ingredient[]) => {
    this.ingredients.push(...ingredient);
    this.ingredientChanged.emit(this.ingredients.slice());
  }
}
