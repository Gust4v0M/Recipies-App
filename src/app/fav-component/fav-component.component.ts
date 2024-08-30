import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InfoRecipiesService } from '../home-component/info-recipies.service';

@Component({
  selector: 'app-fav-component',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './fav-component.component.html',
  styleUrl: './fav-component.component.css'
})
export class FavComponentComponent {
  NomeCategorias!: any;
  nomeHeader!: any;
 

  constructor(private route: ActivatedRoute,
              private service: InfoRecipiesService
  ){}

  ngOnInit(): void {
    this.route.params
    .subscribe(params =>{
      this.NomeCategorias = params['categoria']
      this.categoriaSelecionada(this.NomeCategorias),
      this.nomeTitulo()
    })
  }

  nomeTitulo(){
    this.route.params
    .subscribe(params =>{
      this.nomeHeader = params['categoria']
    })
  }


  categoriaSelecionada(cat: any){
    this.service.getCategoriaDetailsMeals(cat)
    .subscribe(res => this.NomeCategorias = res.meals)
  
  }


}
