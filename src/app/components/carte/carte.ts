import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MenuService } from '../../services/menu';

@Component({
  selector: 'app-carte',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './carte.html',
  styleUrl: './carte.css'
})
export class CarteComponent {
  private readonly menuService = inject(MenuService);

  readonly categories = ['Toutes', 'Plats', 'Grillades', 'Végétarien', 'Boissons'] as const;
  
  // Signals pour les filtres
  readonly selectedCategorie = signal<string>('Toutes');
  readonly searchTerm = signal<string>(''); // Signal pour la recherche par nom

  readonly platsRes = this.menuService.platsResource;
  readonly platDuJour = this.menuService.platDuJour;

  // Computed combinant la catégorie ET le terme de recherche
  readonly platsFiltres = computed(() => {
    const list = this.platsRes.value() ?? [];
    const cat = this.selectedCategorie();
    const query = this.searchTerm().toLowerCase().trim();

    return list.filter((plat) => {
      const matchCategorie = cat === 'Toutes' || plat.categorie === cat;
      const matchName = plat.nom.toLowerCase().includes(query);
      return matchCategorie && matchName;
    });
  });

  // Méthode pour mettre à jour le signal de recherche à chaque saisie
  onSearchChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }
}