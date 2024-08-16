import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InfoRecipiesService } from './info-recipies.service';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [FormsModule, HttpClientModule], 
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {

  food: string = 'Brownies'
  img!: any;
  nome!: string;
  recipiesInfo: {[key: string]: any} = {}
  constructor(private service: InfoRecipiesService) {}

  ngOnInit(){
    this.service.getInfoRecipies(this.food)
    .subscribe((res: any) =>{

      this.img = res.meals[0].strMealThumb
      this.nome = res.meals[0].strMeal
    })

    const recipies = ['Lancashire','Dumpling', 'Pancakes', 'Brownies']
    recipies.forEach(res => this.getRecipiesInfo(res))
  }


  getRecipiesInfo(res: any){
    this.service.getInfoRecipies(res).
    subscribe((dados: any)=>{
      this.recipiesInfo[res] = dados.meals[0]
      console.log(this.recipiesInfo[res])
    }
  )
  }
}
