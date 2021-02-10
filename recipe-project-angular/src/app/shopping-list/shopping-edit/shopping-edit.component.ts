import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list-service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  constructor(private shoppingService: ShoppingListService) {
  }

  ngOnInit(): void {
  }

  onAddItem = ($event, form: NgForm) => {
    $event.preventDefault();
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.shoppingService.addIngredient(newIngredient);
  };

}
