import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import 'rxjs-compat/Rx';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable()
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService) {}

  storeRecipes() {
    // const header = new HttpHeaders().set('Authorization', 'Bearer asdasd');

    // return this.httpClient.put('https://ng-recipe-book-24859.firebaseio.com/recipes.json',
    // this.recipeService.getRecipes(), {
    //   observe: 'body',
    //   params: new HttpParams().set('auth', token),
    //   // headers: header
    // });
    const req = new HttpRequest('PUT',
      'https://ng-recipe-book-24859.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(), {
        reportProgress: true,
      });
    return this.httpClient.request(req);
  }

  getRecipes() {
    this.httpClient.get<Recipe[]>('https://ng-recipe-book-24859.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json'
    })
      .map((recipes) => {
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      })
      .subscribe((res: Recipe[]) => {
          this.recipeService.setRecipes(res);
      });
    }
}
