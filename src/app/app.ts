import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { RestaurantService } from './services/restaurant';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly restaurantService = inject(RestaurantService);

  readonly restaurants = this.restaurantService.restaurants;

  readonly ratedCount = computed(() => {
    const list = this.restaurants() ?? [];
    return list.filter((r) => r.currentRating > 0).length;
  });

  readonly averageRating = computed(() => {
    const list = this.restaurants() ?? [];
    const rated = list.filter((r) => r.currentRating > 0);
    
    if (rated.length === 0) return 0;
    
    const sum = rated.reduce((acc, r) => acc + r.currentRating, 0);
    return Math.round((sum / rated.length) * 10) / 10;
  });
}