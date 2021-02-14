import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  },
  // {
  //   path: 'recipes',
  //   // loadChildren: './recipes/recipe.module#RecipesModule'
  //   // loadChildren: () => import('./recipes/recipe.module')
  //   //   .then(module => module.RecipeModule)
  // },
  {
    path: 'shopping-list',
    component: ShoppingListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
