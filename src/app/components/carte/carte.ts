import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MenuService } from '../../services/menu';

@Component({
  selector: 'app-carte',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './carte.html',
  styleUrl: './carte.css'
})
export class CarteComponent {
  private readonly menuService = inject(MenuService);

  readonly platsResource = this.menuService.platsResource;
  readonly platsFiltres = this.menuService.platsFiltres;
  readonly categorieSelectionnee = this.menuService.categorieSelectionnee;
  readonly recherche = this.menuService.recherche;
  readonly platDuJour = this.menuService.platDuJour;

  readonly categories = ['Toutes', 'Plats', 'Grillades', 'Végétarien', 'Boissons'];

  selectionnerCategorie(categorie: string): void {
    this.menuService.selectionnerCategorie(categorie);
  }

  onRechercheInput(event: Event): void {
    const valeur = (event.target as HTMLInputElement).value;
    this.menuService.modifierRecherche(valeur);
  }
}