import { CommonModule, NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { InfoRecipiesService } from '../home-component/info-recipies.service';
import { RouterLink } from '@angular/router';
import { CategoriesDetailsComponent } from "./categories-details/categories-details.component";
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink, CategoriesDetailsComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{

  constructor(private catService: InfoRecipiesService){}

  categorias!: any;
  mostrarComponent: boolean = false
  categoriaSelecionada: any;



  ngOnInit(): void {
    this.catService.getCategoriesMeals()
    .subscribe((res: any) => this.categorias = res.categories)
    
  }
}
