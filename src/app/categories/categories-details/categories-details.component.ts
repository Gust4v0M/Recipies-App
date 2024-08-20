import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-categories-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories-details.component.html',
  styleUrl: './categories-details.component.css'
})
export class CategoriesDetailsComponent {

  @Input() info: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['info'] && changes['info'].currentValue) {
      console.log('Categoria selecionada:', this.info);
    }
  }

}
