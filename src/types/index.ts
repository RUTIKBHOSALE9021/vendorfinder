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
  isFavorite?: boolean;
  favorite?: boolean;
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

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  vendorId: string;
  vendorName: string;
  lastMessage: string;
  timestamp: Date;
  unread: boolean;
  messages?: Message[];
}

export interface User {
  id: string;
  full_name: string;
  email: string;
  token?: string;
}
