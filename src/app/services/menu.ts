import { Injectable, signal, computed } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { Plat } from '../models/Plat';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
    readonly restaurantName = environment.restaurantName;

    readonly platsResource = httpResource<Plat[]>(
      () => `${environment.serverUrl}/plats.json`
    );

    private readonly _categorieSelectionnee = signal<string>('Toutes');
    readonly categorieSelectionnee = this._categorieSelectionnee.asReadonly();

    selectionnerCategorie(categorie: string): void {
      this._categorieSelectionnee.set(categorie);
    }

    // signal pour la recherche par nom
    private readonly _recherche = signal<string>('');
    readonly recherche = this._recherche.asReadonly();

    modifierRecherche(texte: string): void {
      this._recherche.set(texte);
    }

    // computed combiné : catégorie ET recherche, recalculé automatiquement
    readonly platsFiltres = computed(() => {
      const plats = this.platsResource.value() ?? [];
      const categorie = this._categorieSelectionnee();
      const recherche = this._recherche().toLowerCase().trim();

      let resultat = plats;

      if (categorie !== 'Toutes') {
        resultat = resultat.filter(p => p.categorie === categorie);
      }

      if (recherche) {
        resultat = resultat.filter(p =>
          p.nom.toLowerCase().includes(recherche)
        );
      }

      return resultat;
    });

    private readonly tick = toSignal(interval(5000), { initialValue: 0 });

    readonly platDuJour = computed(() => {
      const plats = this.platsResource.value() ?? [];
      if (plats.length === 0) return null;

      const index = this.tick() % plats.length;
      return plats[index];
    });
}