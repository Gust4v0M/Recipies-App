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

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      name: ['vodin'],
      categories: ['cdk'],
      ingredients: ['null'],
      description: ['sdsdsd'],
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
    this.pushRecipies();
  }

  pushRecipies() {
   
    this.receitas[0].name = this.formulario.value.name;
    this.receitas[0].category = this.formulario.value.categories;
    this.receitas[0].ingredients = this.formulario.value.ingredients;
    this.receitas[0].description = this.formulario.value.description;
  
    console.log(this.receitas);
  }
}
