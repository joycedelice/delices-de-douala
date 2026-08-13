import { Component, input, signal, output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  imports: [],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.css',
})
export class StarRating {
  // Reçoit la note actuelle envoyée par RestaurantCard (ex: 3 ou 0 si non noté)
  currentRating = input<number>(0);

  // Émet la nouvelle note sélectionnée vers le parent RestaurantCard
  ratingChanged = output<number>();

  // État local pour gérer l'étoile actuellement survolée (0 si aucun survol)
  hoverRating = signal<number>(0);

  // Tableau utilitaire pour boucler sur les 5 étoiles
  stars = [1, 2, 3, 4, 5];

  // Gestion du survol
  onMouseEnter(starIndex: number) {
    this.hoverRating.set(starIndex);
  }

  onMouseLeave() {
    this.hoverRating.set(0);
  }

  // Gestion du clic sur une étoile
  selectRating(starIndex: number) {
    // Émet la nouvelle valeur vers le composant parent (RestaurantCard)
    const newRating = this.currentRating() ===starIndex ? 0 : starIndex;
    this.ratingChanged.emit(newRating);
  }
}
