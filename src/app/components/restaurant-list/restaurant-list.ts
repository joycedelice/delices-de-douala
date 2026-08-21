import { Component, input, output } from '@angular/core';
import { Restaurant } from '../../models/restaurant';
import { RestaurantCard } from '../restaurant-card/restaurant-card';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [RestaurantCard],
  templateUrl: './restaurant-list.html',
  styleUrl: './restaurant-list.css'
})
export class RestaurantListComponent {
  // Entrée reçue depuis app.html
  readonly restaurants = input.required<Restaurant[]>();
  readonly restaurantRated = output<{ id: string | number; rating: number }>();

  // La signature du paramètre doit correspondre à ce qui est émis par la carte
  onCardRated(event: { id: string | number; rating: number }): void {
    this.restaurantRated.emit(event);
  }
}