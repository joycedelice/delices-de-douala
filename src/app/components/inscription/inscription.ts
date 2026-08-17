import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css'
})
export class InscriptionComponent {
  // Champ du formulaire — état transitoire
  nom = '';

  // La liste des clients — état applicatif, donc en signal
  private readonly _clients = signal<string[]>([]);
  readonly clients = this._clients.asReadonly();

  // Indice de la ligne en cours de modification (null = mode ajout)
  private readonly _indexEdite = signal<number | null>(null);
  readonly enEdition = computed(() => this._indexEdite() !== null);

  // Ajoute ou modifie un client
  enregistrer(): void {
    const valeur = this.nom.trim();
    if (!valeur) return;

    const i = this._indexEdite();
    if (i === null) {
      this._clients.update((l) => [...l, valeur]); // ajout
    } else {
      this._clients.update((l) =>
        l.map((c, idx) => (idx === i ? valeur : c))); // modification en place
      this._indexEdite.set(null);
    }
    this.nom = ''; // on vide le champ après l'action
  }

  // Recharge la ligne i dans le champ, pour la modifier
  modifier(i: number): void {
    this.nom = this.clients()[i];
    this._indexEdite.set(i);
  }

  // Supprime la ligne i
  supprimer(i: number): void {
    this._clients.update((l) => l.filter((_, idx) => idx !== i));
  }
}