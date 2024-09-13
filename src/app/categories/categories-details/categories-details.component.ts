import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InfoRecipiesService } from '../../home-component/info-recipies.service';

@Component({
  selector: 'app-categories-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories-details.component.html',
  styleUrl: './categories-details.component.css'
})
export class CategoriesDetailsComponent implements OnInit{

  NomeCategorias!: any;
  nomeHeader!: any;
  @Input() Receita: any 
 

  constructor(private route: ActivatedRoute,
              private service: InfoRecipiesService
  ){}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['Receita']) {
      console.log('Receita atualizada:', this.Receita);
    }
  }

  ngOnInit(): void {
    this.route.params
    .subscribe(params =>{
      this.NomeCategorias = params['categoria']
      this.categoriaSelecionada(this.NomeCategorias),
      this.nomeTitulo()
    })
    console.log(this.Receita)
  }

  nomeTitulo(){
    this.route.params
    .subscribe(params =>{
      this.nomeHeader = params['categoria']
    })
  }


  categoriaSelecionada(cat: any){
    this.service.getCategoriaDetailsMeals(cat)
    .subscribe((res: any) => {this.NomeCategorias = res.meals
                               console.log(this.NomeCategorias)})
  
  }

}
