import { Vendor } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addVendorToFavorite, removeVendorToFavorite } from "@/api";
import { getAllVendors } from "@/redux/indexSlice";
import { useState } from "react";

interface VendorCardProps {
  vendor: Vendor;
}

const VendorCard = ({ vendor }: VendorCardProps) => {
  const user = useSelector((state: RootState) => state.vendor.user);
  const refresh = useSelector((state: RootState) => state.vendor.getallVendors);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const addToFavorite = async (user_id: string, vendor_id: string) => {
    try {
      setLoading(true);
      await addVendorToFavorite({ user_id, vendor_id });
      dispatch(getAllVendors(!refresh));
    } catch (error) {
      console.error("Failed to add to favorites:", error);
      alert(error.message || "Failed to add to favorites");
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorite = async (user_id: string, vendor_id: string) => {
    try {
      setLoading(true);
      await removeVendorToFavorite({ user_id, vendor_id });
      dispatch(getAllVendors(!refresh));
    } catch (error) {
      console.error("Failed to remove from favorites:", error);
      alert(error.message || "Failed to remove from favorites");
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      alert("You must be logged in to add favorites!");
      return;
    }
    if (vendor?.favorite) {
      removeFromFavorite(user.id, vendor.id);
    } else {
      addToFavorite(user.id, vendor.id);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 h-full flex flex-col group">
      <Link to={`/vendor/${vendor.id}`} className="flex-grow flex flex-col">
        <div className="relative h-48">
          <img
            src={vendor.image}
            alt={vendor.name}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-3 left-3 bg-white text-primary hover:bg-white">
            {vendor.category}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-3 right-3 bg-white/80 hover:bg-white ${
              vendor?.favorite ? "text-red-500" : "text-gray-500"
            }`}
            onClick={handleFavoriteClick}
            disabled={loading}
          >
            {loading ? (
              <div className="loader h-5 w-5 border-2 border-t-transparent border-gray-500 rounded-full animate-spin"></div>
            ) : (
              <Heart
                className={`h-5 w-5 ${vendor?.favorite ? "fill-red-500" : ""}`}
              />
            )}
          </Button>
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
          <div className="text-sm font-medium text-gray-700">
            {vendor.pricing}
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default VendorCard;
