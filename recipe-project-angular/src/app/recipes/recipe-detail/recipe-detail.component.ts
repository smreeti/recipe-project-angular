import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  addIngredientToShoppingList = (ingredient: Ingredient[]) => {
    this.recipeService.addIngredientToShoppingList(ingredient);
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params.id;
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      );
  }

  onEditRecipe = () => {
    this.router.navigate(['edit'], {relativeTo: this.route});
  };
}
