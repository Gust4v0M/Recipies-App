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

  food: string = 'Spaghetti'
  img!: any;
  constructor(private service: InfoRecipiesService) {}

  ngOnInit(){
    this.service.getInfoRecipies(this.food)
    .subscribe((res: any) =>{
      console.log(res)
      this.img = res.meals[1].strMealThumb
     
    })
  }
}
