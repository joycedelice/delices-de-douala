import { Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription';
import { ConnexionComponent } from './connexion/connexion';
import { AccueilComponent } from './components/accueil/accueil';

import { CarteComponent } from './components/carte/carte';
import { RestaurantsComponent } from './components/restaurants/restaurants';

export const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'restaurants', component: RestaurantsComponent},
  { path: 'plats', component: CarteComponent },
  { path: 'plats/:slug', component: CarteComponent }, // Route dynamique du Jour 11
  { path: 'inscription', component: InscriptionComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: '**', redirectTo: '' }
];