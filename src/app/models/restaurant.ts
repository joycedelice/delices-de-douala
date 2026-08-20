export interface Restaurant {
  id: number;
  name: string;
  district: string;
  specialty: string;
  currentRating: number;
  imageUrl?: string; // Ajout de la propriété pour l'image
}