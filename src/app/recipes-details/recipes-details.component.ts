import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoRecipiesService } from '../home-component/info-recipies.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipes-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipes-details.component.html',
  styleUrl: './recipes-details.component.css',
})
export class RecipesDetailsComponent implements OnInit {
  nomeReceita!: any;
  infoRecipies!: any;

  constructor(
    private route: ActivatedRoute,
    private service: InfoRecipiesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((routeName) => {
      this.nomeReceita = routeName['NomeCategoria'];
    });
    this.getInfoReceita(this.nomeReceita);
  }

  
  getInfoReceita(receita: any) {
    this.service.getInfoRecipies(receita)
      .subscribe(res => {
        this.infoRecipies = res.meals[0];
        this.infoRecipies.ingredients = [];
  
        for (let i = 1; i <= 20; i++) {
          const ingredient = this.infoRecipies[`strIngredient${i}`];
          const measure = this.infoRecipies[`strMeasure${i}`];
  
          if (ingredient && ingredient.trim() !== "") {
            this.infoRecipies.ingredients.push({
              ingredient,
              measure
            });
          }
        }
      });
  }
}
