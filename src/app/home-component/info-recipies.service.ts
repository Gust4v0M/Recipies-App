import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoRecipiesService {


   private readonly API_URL = 'https://themealdb.com/api/json/v1/1/search.php?s='
   
   constructor(private http: HttpClient) { }

  getInfoRecipies(recipies: any):Observable<any>{ 
    const apiRes = `${this.API_URL}${recipies}`

    return this.http.get(apiRes)
  }

}
