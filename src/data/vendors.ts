
import { Vendor, VendorCategory } from "@/types";

export const vendors: Vendor[] = [
  {
    id: "1",
    name: "Elegant Moments Photography",
    description: "Professional photography for all your special moments. Specializing in weddings, engagements, and family portraits.",
    category: "Photographer",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    contactEmail: "contact@elegantmomentsphoto.com",
    contactPhone: "(555) 123-4567",
    pricing: "$1500-$3000",
    rating: 4.8
  },
  {
    id: "2",
    name: "Divine Catering",
    description: "Exquisite cuisine for your events. We offer a wide range of menu options to suit your taste and budget.",
    category: "Caterer",
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    contactEmail: "info@divinecatering.com",
    contactPhone: "(555) 987-6543",
    pricing: "$25-$45 per person",
    rating: 4.6
  },
  {
    id: "3",
    name: "Harmony Wedding Venues",
    description: "Beautiful and spacious venues for your special day. Indoor and outdoor options available.",
    category: "Venue",
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    contactEmail: "bookings@harmonyvenues.com",
    contactPhone: "(555) 789-0123",
    pricing: "$5000-$15000",
    rating: 4.9
  },
  {
    id: "4",
    name: "Creative Decorations",
    description: "Transform your event space with our creative decoration services. Customized themes and designs.",
    category: "Decorator",
    location: "Miami, FL",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    contactEmail: "hello@creativedeco.com",
    contactPhone: "(555) 456-7890",
    pricing: "$1000-$5000",
    rating: 4.5
  },
  {
    id: "5",
    name: "Melody Makers",
    description: "Live music for all occasions. From classical to contemporary, we have the perfect sound for your event.",
    category: "Music",
    location: "Austin, TX",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    contactEmail: "book@melodymakers.com",
    contactPhone: "(555) 321-6547",
    pricing: "$800-$2500",
    rating: 4.7
  },
  {
    id: "6",
    name: "Forever Films",
    description: "Capture your special day with our professional videography services. Cinematic wedding films that tell your story.",
    category: "Videographer",
    location: "Seattle, WA",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    contactEmail: "info@foreverfilms.com",
    contactPhone: "(555) 234-5678",
    pricing: "$2000-$4000",
    rating: 4.8
  }
];

export const categories: VendorCategory[] = [
  "Photographer",
  "Caterer",
  "Venue",
  "Decorator",
  "Music",
  "Videographer",
  "Wedding Planner",
  "Florist",
  "Cake"
];
