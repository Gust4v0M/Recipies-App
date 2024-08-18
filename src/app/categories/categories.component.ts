import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InfoRecipiesService } from '../home-component/info-recipies.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{

  constructor(private catService: InfoRecipiesService){}

  categorias!: any;


  ngOnInit(): void {
    this.catService.getCategoriesMeals()
    .subscribe((res: any) => this.categorias = res.categories)
  }
}
