import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {}

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
  }

  pushRecipies() {}

  InputValues() {
    let idRecipie = this.receitas[0].id;
    this.id.push(idRecipie + 1);

    if (this.receitas[0].name !== null) {
      for (let i = 0; i < this.receitas.length; i++) {
        if (i <= 0) {

          
          this.receitas[i].name = this.formulario.value.name;
          this.receitas[i].category = this.formulario.value.categories;
          this.receitas[i].ingredients = this.formulario.value.ingredients;
          this.receitas[i].description = this.formulario.value.description;
          this.receitas.push(this.receitas[i])
          console.log(this.receitas);

        }
      }
    }

    // if (this.receitas[0].name !== null) {
    //   const recipieDetails = Object.create(this.receitas);
    //   recipieDetails.name = this.formulario.value.name;
    //   recipieDetails.category = this.formulario.value.categories;
    //   recipieDetails.ingredients = this.formulario.value.ingredients;
    //   recipieDetails.description = this.formulario.value.description;
    //   console.log(recipieDetails);
    // }
  }
}
