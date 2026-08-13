import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  //input du nombres de restaurant notes
  ratedCount = input.required<number>();
  //input de la moyenne des notes des restaurants
  averageRating = input<number>(0);
}
