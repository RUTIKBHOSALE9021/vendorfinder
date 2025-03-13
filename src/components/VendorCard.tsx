
import { Vendor } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface VendorCardProps {
  vendor: Vendor;
}

const VendorCard = ({ vendor }: VendorCardProps) => {
  return (
    <Link to={`/vendor/${vendor.id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
        <div className="relative h-48">
          <img 
            src={vendor.image} 
            alt={vendor.name} 
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-3 left-3 bg-white text-primary hover:bg-white">
            {vendor.category}
          </Badge>
        </div>
        
        <CardContent className="pt-4 pb-0 flex-grow">
          <h3 className="text-lg font-semibold mb-1">{vendor.name}</h3>
          
          <div className="flex items-center mb-2">
            <MapPin className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-sm text-gray-500">{vendor.location}</span>
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-2 mb-2">
            {vendor.description}
          </p>
        </CardContent>
        
        <CardFooter className="pt-2 pb-4 flex items-center justify-between">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="font-medium">{vendor.rating}</span>
          </div>
          <div className="text-sm font-medium text-gray-700">{vendor.pricing}</div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default VendorCard;
