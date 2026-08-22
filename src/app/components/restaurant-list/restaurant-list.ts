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
  // Liste des restaurants transmise par le composant parent
  readonly restaurants = input.required<Restaurant[]>();
  
  // Événement émis vers le composant parent
  readonly restaurantRated = output<{ id: string | number; rating: number }>();

  onCardRated(event: { id: string | number; rating: number }): void {
    this.restaurantRated.emit(event);
  }
}