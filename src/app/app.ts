import { Component, computed, inject, signal } from '@angular/core';
import { Header } from './components/header/header';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list';
import { RestaurantService } from './services/restaurant';
import { CarteComponent } from './components/carte/carte';
import { InscriptionComponent } from './inscription/inscription';
import { ConnexionComponent } from './connexion/connexion';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, RestaurantListComponent, CarteComponent, InscriptionComponent, ConnexionComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // 1. Injection du service Angular moderne sans constructeur
  private readonly restaurantService = inject(RestaurantService);

  // 2. Signals pour les filtres d'affichage UI
  readonly sortDesc = signal(false);
  readonly onlyTopRated = signal(false);

  // 3. Récupération des données et de l'état HTTP depuis le service[cite: 1]
  readonly restaurantsRes = this.restaurantService.restaurantsResource;
  readonly restaurants = this.restaurantService.restaurants;

  // 4. Calcul du nombre de restaurants ayant reçu au moins une note[cite: 1]
  readonly ratedCount = computed(() => {
    const list = this.restaurants() ?? [];
    return list.filter((r) => r.currentRating > 0).length;
  });

  // 5. Calcul de la moyenne générale des notes[cite: 1]
  readonly averageRating = computed(() => {
    const list = this.restaurants() ?? [];
    const rated = list.filter((r) => r.currentRating > 0);
    
    if (rated.length === 0) return 0;
    
    const sum = rated.reduce((acc, r) => acc + r.currentRating, 0);
    return Math.round((sum / rated.length) * 10) / 10;
  });

  // 6. Application des filtres de tri et de note minimale sur la liste[cite: 1]
  readonly displayedRestaurants = computed(() => {
    const list = this.restaurants() ?? [];
    let result = [...list];

    if (this.onlyTopRated()) {
      result = result.filter((r) => r.currentRating >= 4);
    }

    if (this.sortDesc()) {
      result = result.sort((a, b) => b.currentRating - a.currentRating);
    }

    return result;
  });

  // 7. Relais de l'événement de notation vers le service[cite: 1]
  onRestaurantRated(event: { id: string | number; rating: number }): void {
    this.restaurantService.updateRating(event.id, event.rating);
  }
}