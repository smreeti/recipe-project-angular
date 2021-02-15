import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {ShoppingEditComponent} from './shopping-list/shopping-edit/shopping-edit.component';
import {ShoppingListService} from './shopping-list/shopping-list-service';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RecipeService} from './recipes/recipe.service';
import {HttpClientModule} from '@angular/common/http';
import {RecipeModule} from './recipes/recipe.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RecipeModule,
    AppRoutingModule,
  ],
  providers: [ShoppingListService, RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
