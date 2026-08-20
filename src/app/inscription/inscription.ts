import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './inscription.html',
})
export class InscriptionComponent {
  // Champ du formulaire (état transitoire)
  nom = '';

  // Liste des clients (état applicatif)
  private readonly _clients = signal<string[]>([]);
  readonly clients = this._clients.asReadonly();
  // Indice de la ligne en cours de modification (null = mode ajout)
  private readonly _indexEdite = signal<number | null>(null);
  readonly enEdition = computed(() => this._indexEdite() !== null);

  // Enregistrer (Ajouter ou Modifier)
  enregistrer(): void {
    const valeur = this.nom.trim();
    if (!valeur) return;

    const i = this._indexEdite();
    if (i === null) {
      // Ajout : création d'un nouveau tableau immutable
      this._clients.update((l) => [...l, valeur]);
    } else {
      // Modification en place
      this._clients.update((l) => l.map((c, idx) => (idx === i ? valeur : c)));
      this._indexEdite.set(null);
    }
    this.nom = ''; // Vider le champ
  }

  // Préparer la modification
  modifier(i: number): void {
    this.nom = this.clients()[i]; // Recharge la valeur dans le champ
    this._indexEdite.set(i);
  }

  // Supprimer
  supprimer(i: number): void {
    this._clients.update((l) => l.filter((_, idx) => idx !== i));
  }
}
