import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeForm: FormGroup;
  id: number;
  editMode = false;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params.id;
        this.editMode = params.id != null;
        this.initForm();
      }
    );
  }

  private initForm = () => {
    let recipeName = '';
    let imagePath = '';
    let description = '';

    // let recipeIngredients = new FormGroup({
    //   name: new FormArray([])
    // });

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;

      // if (recipe.ingredient) {
      //   recipe.ingredient.forEach(ingredient => {
      //     recipeIngredients.push(new FormGroup({
      //       name: new FormControl(ingredient.name),
      //       amount: new FormControl(ingredient.amount)
      //     }));
      //   });
      // }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imagePath: new FormControl(imagePath),
      description: new FormControl(description),
      // ingredients: recipeIngredients
    });
  };

  onAddRecipe = (event) => {
    event.preventDefault();
    const {id, name, description, imagePath} = this.recipeForm.value;
    const recipe = new Recipe(id, name, description, imagePath, []);

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, recipe);
    } else {
      const newRecipe = new Recipe(Math.random(), name, description, imagePath, []);
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancelAction();
  };

  onCancelAction = () => {
    this.router.navigate(['../'], {relativeTo: this.route});
  };


}
