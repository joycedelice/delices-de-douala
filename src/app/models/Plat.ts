export interface Plat {
  id: string;
  nom: string;
  prix: number;
  categorie: 'Plats' | 'Grillades' | 'Végétarien' | 'Boissons';
  disponible: boolean;
}