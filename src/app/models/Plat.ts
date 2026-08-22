export interface Plat {
  id: string;
  nom: string;
  prix: number;
  categorie: 'Plats' | 'Grillades' | 'Végétarien' | 'Boissons';
  disponible: boolean;
  imageUrl?: string; // Ajout de l'image (optionnelle)
}