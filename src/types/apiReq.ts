export interface VendorRequest {
    name: string;
    description: string;
    category: string;
    location: string;
    image: string;
    contactEmail: string;
    contactPhone: string;
    pricing: number;
    rating: number;
  }
  
  export interface addVendorToFavoriteReq {
      user_id: string,
      vendor_id:string
  }