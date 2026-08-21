import { Injectable, signal, effect } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Restaurant } from '../models/restaurant';

@Injectable({ providedIn: 'root' })
export class RestaurantService {
  // Utilisation directe du chemin vers le dossier public
  private readonly apiUrl = '/api/restaurants.json';

  // Resource pour la requête HTTP
  readonly restaurantsResource = httpResource<Restaurant[]>(() => this.apiUrl);

  // Signal privé pour l'état mutable local
  private readonly _restaurants = signal<Restaurant[]>([]);
  readonly restaurants = this._restaurants.asReadonly();

  constructor() {
    effect(() => {
      const data = this.restaurantsResource.value();
      if (data) {
        this._restaurants.set(data);
      }
    });
  }

  updateRating(id: number | string, newRating: number): void {
    this._restaurants.update((list) =>
      list.map((r) => (r.id === id ? { ...r, currentRating: newRating } : r))
    );
  }
}