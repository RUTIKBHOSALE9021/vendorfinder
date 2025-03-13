
import { useFavorites } from "@/contexts/FavoritesContext";
import VendorList from "@/components/VendorList";
import Header from "@/components/Header";
import { Heart } from "lucide-react";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Heart className="h-6 w-6 text-red-500 mr-2 fill-red-500" />
          <h1 className="text-3xl font-bold">My Favorites</h1>
        </div>
        
        {favorites.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-800 mb-2">No favorites yet</h2>
            <p className="text-gray-500">
              Start adding vendors to your favorites to see them here.
            </p>
          </div>
        ) : (
          <VendorList vendors={favorites} />
        )}
      </main>
    </div>
  );
};

export default Favorites;
