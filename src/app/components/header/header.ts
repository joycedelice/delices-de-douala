import { Component, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  // Input du nombre de restaurants notés
  ratedCount = input.required<number>();
  // Input de la moyenne des notes des restaurants
  averageRating = input<number>(0);

  // Signal pour gérer l'affichage du menu burger sur mobile
  readonly menuOuvert = signal(false);

  toggleMenu(): void {
    this.menuOuvert.set(!this.menuOuvert());
  }

  fermerMenu(): void {
    this.menuOuvert.set(false);
  }
}