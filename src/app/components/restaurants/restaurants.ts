import { Component, computed, inject, signal } from '@angular/core';
import { Restaurant } from '../../models/restaurant';
import { RestaurantListComponent } from '../restaurant-list/restaurant-list';
import { RestaurantService } from '../../services/restaurant';


@Component({
  selector: 'app-restaurants-page',
  standalone: true,
  imports: [RestaurantListComponent],
  templateUrl: './restaurants.html',
  styleUrl: './restaurants.css'
})
export class RestaurantsComponent {
  private readonly restaurantService = inject(RestaurantService);

  readonly sortDesc = signal(false);
  readonly onlyTopRated = signal(false);

  // Récupération de la liste des restaurants depuis le service
  readonly rawRestaurants = this.restaurantService.restaurants;

  // Calcul dynamique selon les filtres
  readonly displayedRestaurants = computed(() => {
    let list = [...(this.rawRestaurants() ?? [])];

    if (this.onlyTopRated()) {
      list = list.filter(r => r.currentRating >= 4);
    }

    if (this.sortDesc()) {
      list.sort((a, b) => b.currentRating - a.currentRating);
    }

    return list;
  });

  onRestaurantRated(event: { id: string | number; rating: number }): void {
    this.restaurantService.updateRating(event.id, event.rating);
  }
}