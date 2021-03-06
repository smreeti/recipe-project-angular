import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Tomato', 50),
    new Ingredient('Onion', 30)
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  onIngredientAdded = (newIngredient: Ingredient) => {
    this.ingredients.push(newIngredient);
  }
}
