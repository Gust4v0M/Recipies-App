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
  nomeReceitas!: any;
  DetalheReceita:any = []

  constructor(private service: InfoRecipiesService){}

  ngOnInit(): void {
   this.nomeReceitas = this.service.getFromLocalStorage('favRecipies') || [];

    //  console.log(this.nomeReceitas);

    //  for(let i =0; i < this.nomeReceitas.length; i++){
    //       this.receitaSelecionada(this.nomeReceitas[i])

    //  }
      this.nomeReceitas.forEach((res: any) => this.receitaSelecionada(res))      


    
  }




  receitaSelecionada(receita: any){

    this.service.getInfoRecipies(receita).subscribe((dados : any) =>{
    this.DetalheReceita.push(dados.meals[0])
    console.log(this.DetalheReceita)
    })
   
  }


}
