import { Routes } from '@angular/router';
import { CarteComponent } from './components/carte/carte';
import { PlatDetailComponent } from './components/plat-detail/plat-detail';
import { InscriptionComponent } from './inscription/inscription';
import { ConnexionComponent } from './connexion/connexion';

export const routes: Routes = [
  { path: '', component: CarteComponent }, // Affiche le menu par défaut
  { path: 'plats/:slug', component: PlatDetailComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: '**', redirectTo: '' }
];