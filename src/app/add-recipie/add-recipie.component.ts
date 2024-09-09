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
  of,
  switchMap,
  tap,
} from 'rxjs';
import { subscribe } from 'node:diagnostics_channel';
import { CategoriesDetailsComponent } from '../categories/categories-details/categories-details.component';
import { Database } from 'firebase/database';
import firebase from 'firebase/compat/app';
//import firebase from 'firebase/app';
import 'firebase/compat/firestore';

@Component({
  selector: 'app-add-recipie',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CategoriesDetailsComponent],
  templateUrl: './add-recipie.component.html',
  styleUrl: './add-recipie.component.css',
})
export class AddRecipieComponent implements OnInit {
  formulario!: FormGroup;
  receitas: any;
  id: String[] = [];
  categoriesResults$: any = of([]);
  categories = new FormControl();
  mostrarLista: boolean = true;
  apagaComponent: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: InfoRecipiesService,
    
  ) {}

  ngOnInit() {

    var firebaseConfig = {
      apiKey: "AIzaSyBDGWDD3wHLKpUuCcPCeEu-6uHb_6NEzTU",
      authDomain: "recipies-app-509fa.firebaseapp.com",
      databaseURL: "https://recipies-app-509fa-default-rtdb.firebaseio.com",
      projectId: "recipies-app-509fa",
      storageBucket: "recipies-app-509fa.appspot.com",
      messagingSenderId: "867181965922",
      appId: "1:867181965922:web:1ddab4b6860be3ae32173b",
      measurementId: "G-H7QM41MFQ2"
    };
    firebase.initializeApp(firebaseConfig);
    
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

    if (this.isBrowser()) {
      const storedReceitas = localStorage.getItem('receitas');
      if (storedReceitas) {
        this.receitas = JSON.parse(storedReceitas);
      }
    }
    this.categoriesResults$ = this.categories.valueChanges.pipe(
      filter((value: any) => value.length > 0),
      tap((value) => console.log('teste' + value)),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((value: any) =>
        this.service.getCategoriesMeals().pipe(
          map((response: any) => {
            const filteredCategories = response.categories.filter(
              (category: any) =>
                category.strCategory.toLowerCase().includes(value.toLowerCase())
            );
            // Garantindo que o resultado seja um array
            return Array.isArray(filteredCategories) ? filteredCategories : [];
          })
        )
      )
    );

    console.log(this.receitas);
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  async InputValues() {
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

      await firebase.firestore().collection('receitas').add({
        name: name,
        category: category,
        ingredients: ingredients,
        description: description,
      });
    }
  }

  categoriaEscolhida(categoria: string) {
    let inputCat = this.formulario.get('categories')?.setValue(categoria);

    if (inputCat !== null) {
      this.mostrarLista = false;
    }
  }
}
