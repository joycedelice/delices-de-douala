import { Component, computed, signal  } from '@angular/core';
import { Header } from './components/header/header';
import { RestaurantList } from './components/restaurant-list/restaurant-list';
import { Restaurant } from './models/restaurant';
import { CarteComponent } from './components/carte/carte';
import { InscriptionComponent } from './components/inscription/inscription';


@Component({
  selector: 'app-root',
  imports: [ Header , RestaurantList ,CarteComponent , InscriptionComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('delices-de-douala');
  //tableaux des restarants
  restaurants = signal<Restaurant[]>([ 
    { id: 1, name: 'Le Calao Doré', district: 'Akwa', 
      specialty: 'Ndolé aux crevettes', currentRating: 0 }, 
    { id: 2, name: 'Chez Madame Ngono', district: 'Bonapriso', 
      specialty: 'Eru aux pieds de bœuf', currentRating: 0 }, 
    { id: 3, name: 'La Fourchette Camerounaise', district: 'Bonanjo', 
      specialty: 'Poulet DG', currentRating: 0 }, 
    { id: 4, name: 'Saveurs du Wouri', district: 'Bonamoussadi', 
      specialty: 'Poisson braisé', currentRating: 0 }, 
    { id: 5, name: "L'Akwa Gourmand", district: 'Akwa', 
      specialty: 'Bobolo et sauce arachide', currentRating: 0 }, 
    { id: 6, name: 'Le Royal de Bali', district: 'Bali', 
      specialty: 'Koki et plantain', currentRating: 0 } 
  ]); 
  //met a jour la note du restaurant
  onSendApp(event :{id:number ; rating: number}): void {
      this.restaurants.update((restaurants) =>
        restaurants.map((restaurant) =>
          restaurant.id === event.id 
        ? { ...restaurant, currentRating:event.rating}
        : restaurant
        )
      );
  }

  //calcul du nombre de restaurant notes 
  //signal calcule se met a jour tout seul des que restaurants change
  ratedCount = computed(()=>{
    //computed cree un signal calcule (ratedCount)
    return this.restaurants().filter(r => r.currentRating > 0).length;

  });
  //calcul de la moyenne des notes des restaurants
  // Note moyenne calculée automatiquement
  averageRating = computed(() => {
    // 1. On filtre les restaurants qui ont reçu au moins une note
    const rated = this.restaurants().filter(r => r.currentRating > 0);

    // Si aucun restaurant n'est encore noté, on renvoie 0
    if (rated.length === 0) return 0;

    // 2. On calcule la somme des notes
    const sum = rated.reduce((total, r) => total + r.currentRating, 0);

    // 3. On calcule la moyenne et on arrondit à 1 décimale (ex: 3.8)
    return Number((sum / rated.length).toFixed(1));
  });


  // Signal dérivé : Trie les restaurants par note décroissante
  //signal pour l'eteat du bouton du classement
  classement = signal<boolean>(false);
  toggleClassement(){
    this.classement.update(c => !c);
  }
  sortedRestaurants = computed(() => {
    // [...this.restaurants()] crée une copie pour ne pas muter le signal d'origine
    return [...this.restaurants()].sort((a, b) => b.currentRating - a.currentRating);
  });

  
  //pour le bouton
  //  Signal pour l'état du bouton filtre (actif / inactif)
  showOnlyTopRated = signal<boolean>(false);

  //  Méthode pour basculer la valeur du filtre (true <-> false)
  toggleFilter() {
    this.showOnlyTopRated.update(value => !value);
  }

  //  Signal dérivé : Filtre ET Trie la liste automatiquement
  displayedRestaurants = computed(() => {
    let list = this.restaurants();

    // Si le filtre est activé, on conserve uniquement les notes >= 4
    if (this.showOnlyTopRated()) {
      list = list.filter(r => r.currentRating >= 4);
    }

    // On trie ensuite la liste par note décroissante
    // On ne trie QUE si le classement est activé
    if (this.classement()) {
      list = [...list].sort((a, b) => b.currentRating - a.currentRating);
    }

    return list
  });
  
}
