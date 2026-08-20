export interface Plat {
  id: number | string;
  nom: string;
  slug: string;
  prix: number;
  image: string;
  description: string;
  categorie?: string;
}