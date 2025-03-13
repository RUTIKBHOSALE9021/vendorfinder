
export interface Vendor {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  image: string;
  contactEmail: string;
  contactPhone: string;
  pricing: string;
  rating: number;
}

export type VendorCategory = 
  | "Photographer" 
  | "Caterer" 
  | "Venue" 
  | "Decorator" 
  | "Music" 
  | "Videographer"
  | "Wedding Planner"
  | "Florist"
  | "Cake";
