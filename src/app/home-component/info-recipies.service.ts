import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoRecipiesService {


   private readonly API_URL = 'https://themealdb.com/api/json/v1/1/search.php?s='

   private readonly API_CAT_URL = 'https://themealdb.com/api/json/v1/1/categories.php'
   
   private readonly API_CAT_DETAILS_URL = 'https://themealdb.com/api/json/v1/1/filter.php?c='

   constructor(private http: HttpClient) { }

  getInfoRecipies(recipies: any):Observable<any>{ 
    const apiRes = `${this.API_URL}${recipies}`

    return this.http.get(apiRes)
  }
  getCategoriesMeals(){
    return this.http.get(this.API_CAT_URL)
  }

  getCategoriaDetailsMeals(cat: any):Observable<any>{
    const apiRes = `${this.API_CAT_DETAILS_URL}${cat}`

    return this.http.get(apiRes)
  }

}
