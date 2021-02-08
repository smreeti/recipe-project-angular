import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('descriptionInput') descriptionInputRef: ElementRef;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params.id;
        this.editMode = params.id != null;
      }
    );
  }

  onAddRecipe = (event) => {
    event.preventDefault();
    const name = this.nameInputRef.nativeElement.value;
    const description = this.descriptionInputRef.nativeElement.value;
    const newRecipe = new Recipe(null, name, description, null, []);
    this.recipeService.addRecipe(newRecipe);
  };


}
