import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InfoRecipiesService } from './info-recipies.service';
import { subscribe } from 'diagnostics_channel';
import { RouterLink } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css'],
})
export class HomeComponentComponent implements OnInit {
  food: string = 'Brownies';
  img!: any;
  nome!: string;
  input = new FormControl();
  results$!: any;
  recipiesInfo: { [key: string]: any } = {};
  nomeReceitas: any;


  constructor(private service: InfoRecipiesService) {}

  ngOnInit() {
    this.service.getInfoRecipies(this.food).subscribe((res: any) => {
      this.img = res.meals[0].strMealThumb;
      this.nome = res.meals[0].strMeal;
    });

    const recipies = ['Lancashire', 'Dumpling', 'Pancakes', 'Brownies'];
    recipies.forEach((res) => this.getRecipiesInfo(res));

    this.results$ = this.input.valueChanges.pipe(
      filter((value: any) => value.length > 1),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((value: any) =>
        this.service.getIngredients(value).pipe(
          map((response: any) => {
            return response.meals.filter((meal: any) =>
              meal.strMeal.toLowerCase().includes(value.toLowerCase())
            );
          })
        )
      )
    )

    this.nomeReceitas = [
      {nome:''}
    ]
  }
  saveFavComponent(nomeReceita: any){

    let favRecipies = this.service.getFromLocalStorage('favRecipies') || []
    favRecipies.push(nomeReceita)
    this.service.saveToLocalStorage('favRecipies', favRecipies)
  }

  getRecipiesInfo(res: any) {
    this.service.getInfoRecipies(res).subscribe((dados: any) => {
      this.recipiesInfo[res] = dados.meals[0];
       console.log(this.recipiesInfo[res])
    });
  }

  getIngrdientsforMeals() {
    console.log(this.input.value);
  }
}
