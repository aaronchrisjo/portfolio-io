export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  detailsUrl: string;
  category: string;
  isFavorite?: boolean;
  pageUrl: string;
  technologies: string[];
  userId: string; 
  editing?: boolean;
}
