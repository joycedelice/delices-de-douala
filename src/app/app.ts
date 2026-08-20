import { Component, computed, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Header } from './components/header/header';
import { Restaurant } from './models/restaurant';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  restaurants = signal<Restaurant[]>([ 
    { id: 1, name: 'Le Calao Doré', district: 'Akwa', specialty: 'Ndolé aux crevettes', currentRating: 0, imageUrl: 'images/resto4.png' }, 
    { id: 2, name: 'Chez Madame Ngono', district: 'Bonapriso', specialty: 'Eru aux pieds de bœuf', currentRating: 0, imageUrl: 'images/resto2.png' }, 
    { id: 3, name: 'La Fourchette', district: 'Bonanjo', specialty: 'Poulet DG', currentRating: 0, imageUrl: 'images/resto3.png' }, 
    { id: 4, name: 'Saveurs du Wouri', district: 'Bonamoussadi', specialty: 'Poisson braisé', currentRating: 0, imageUrl: 'images/resto1.png' }, 
    { id: 5, name: "L'Akwa Gourmand", district: 'Akwa', specialty: 'Bobolo et sauce arachide', currentRating: 0, imageUrl: 'images/resto5.png' }, 
    { id: 6, name: 'Le Royal de Bali', district: 'Bali', specialty: 'Koki et plantain', currentRating: 0, imageUrl: 'images/resto6.png' } 
  ]); 

  ratedCount = computed(() => this.restaurants().filter(r => r.currentRating > 0).length);

  averageRating = computed(() => {
    const rated = this.restaurants().filter(r => r.currentRating > 0);
    if (rated.length === 0) return 0;
    const sum = rated.reduce((total, r) => total + r.currentRating, 0);
    return Number((sum / rated.length).toFixed(1));
  });
}