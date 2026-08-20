import { Component, input, output } from '@angular/core';
import { RestaurantCard } from '../restaurant-card/restaurant-card';
import { Restaurant } from '../../models/restaurant';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [RestaurantCard],
  templateUrl: './restaurant-list.html',
  styleUrl: './restaurant-list.css',
})
export class RestaurantList {
  // Entrée obligatoire de la liste des restaurants
  restaurants = input.required<Restaurant[]>();

  // Émission de l'événement de changement de note vers le composant parent (AppComponent)
  sendApp = output<{ id: number; rating: number }>();

  onSendApp(event: { id: number; rating: number }): void {
    this.sendApp.emit(event);
  }
}