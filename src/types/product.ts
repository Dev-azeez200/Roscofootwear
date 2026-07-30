export interface Product {
  id: number;
  name: string;
  category: string;
  collection: string;
  price: number;
  image: string;
  badge?: string;
  color: string;
  material: string;
  sizes: number[];
}
