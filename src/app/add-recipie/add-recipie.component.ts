import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { InfoRecipiesService } from '../home-component/info-recipies.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { subscribe } from 'node:diagnostics_channel';

@Component({
  selector: 'app-add-recipie',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-recipie.component.html',
  styleUrl: './add-recipie.component.css',
})
export class AddRecipieComponent implements OnInit {
  formulario!: FormGroup;
  receitas: any;
  id: String[] = [];
  categoriesResults$: any;
  categories = new FormControl();
teste!: any;
  constructor(
    private formBuilder: FormBuilder,
    private service: InfoRecipiesService
  ) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      name: [''],
      categories: [''],
      ingredients: [''],
      description: [''],
    });

    this.receitas = [
      {
        id: 1,
        name: '',
        category: '',
        ingredients: '',
        description: '',
      },
    ];
    this.service.getCategoriesMeals()
    .subscribe((res: any) => this.teste = res.categories)
    if (this.isBrowser()) {
      localStorage.getItem('receitas');
    }
    this.categoriesResults$ = this.categories.valueChanges.pipe(
      filter((value: any) => value.length > 1),
      tap(value => console.log("teste" + value)),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((value: any) =>
        this.service.getCategoriesMeals().pipe(
          map((response: any) => {
            const filteredCategories = response.categories.filter((category: any) =>
              category.strCategory.toLowerCase().includes(value.toLowerCase())
            );
            // Garantindo que o resultado seja um array
            return Array.isArray(filteredCategories) ? filteredCategories : [];
          })
        )
      )
    );
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  InputValues() {
    if (this.receitas[0].name !== null) {
      const name = this.formulario.value.name;
      const category = this.formulario.value.categories;
      const ingredients = this.formulario.value.ingredients;
      const description = this.formulario.value.description;

      const newRecipie = (this.receitas[0] = {
        name: name,
        category: category,
        ingredients: ingredients,
        description: description,
      });
      this.receitas.push(newRecipie);
      console.log(this.receitas);
      localStorage.setItem('receitas', this.receitas);
    }
  }
}
