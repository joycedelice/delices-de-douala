import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MenuService } from '../../services/menu';

@Component({
  selector: 'app-carte',
  standalone: true, //[cite: 1]
  imports: [CurrencyPipe],
  templateUrl: './carte.html',
  styleUrl: './carte.css'
})
export class CarteComponent {
  // Mission 2: Injection moderne via inject() sans constructeur[cite: 1]
  private readonly menuService = inject(MenuService);

  readonly categories = ['Toutes', 'Plats', 'Grillades', 'Végétarien', 'Boissons'] as const;
  
  // Mission 4: Signal pour la catégorie sélectionnée[cite: 1]
  readonly selectedCategorie = signal<string>('Toutes');

  // Exposition des données du service
  readonly platsRes = this.menuService.platsResource;
  readonly platDuJour = this.menuService.platDuJour;

  // Mission 4: Computed dérivation sans recalcul manuel[cite: 1]
  readonly platsFiltres = computed(() => {
    const list = this.platsRes.value() ?? [];
    const cat = this.selectedCategorie();

    if (cat === 'Toutes') return list;
    return list.filter((p) => p.categorie === cat);
  });
}