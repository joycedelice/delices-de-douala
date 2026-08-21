import { Component, input, output } from '@angular/core';
import { StarRating } from '../star-rating/star-rating';
import { Restaurant } from '../../models/restaurant';

@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [StarRating],
  templateUrl: './restaurant-card.html',
  styleUrl: './restaurant-card.css',
})
export class RestaurantCard {
  restaurant = input.required<Restaurant>();
  
  // Nommé 'ratingChanged' pour correspondre au HTML[cite: 1]
  ratingChanged = output<{ id: number | string; rating: number }>();

  onRatingChanged(newRating: number): void {
    this.ratingChanged.emit({ id: this.restaurant().id, rating: newRating });
  }
}