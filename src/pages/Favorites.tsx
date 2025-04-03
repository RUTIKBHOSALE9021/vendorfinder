
import VendorList from "@/components/VendorList";
import Header from "@/components/Header";
import { Heart } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { getFavoriteVendor } from "@/api";

const Favorites = () => {
  const [favorites,setFavorites] = useState([]);
  const refresh = useSelector((state: RootState) => state.vendor.getallVendors);
  const user  = useSelector((state: RootState) => state.vendor.user);
  const [loading, setLoading] = useState(true);
  const fetchFavorites = async (showLoading = false) => {
    if (!user?.id) return;
    if (showLoading) setLoading(true);
    try {
      const response = await getFavoriteVendor(user.id);
      setFavorites(response.vendors);
    } catch (err) {
      console.error("Error fetching favorite vendors:", err);
    } finally {
      if (showLoading) setLoading(false);
    }
  };
  useEffect(() => {
    fetchFavorites(true);
  }, [user?.id]);


  useEffect(() => {
    fetchFavorites(false);
  }, [refresh]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Heart className="h-6 w-6 text-red-500 mr-2 fill-red-500" />
          <h1 className="text-3xl font-bold">My Favorites</h1>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ): favorites.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-800 mb-2">
              No favorites yet
            </h2>
            <p className="text-gray-500">
              Start adding vendors to your favorites to see them here.
            </p>
          </div>
        ) : (
          <VendorList  vendors={favorites} />
        )}
      </main>
    </div>
  );
};

export default Favorites;
