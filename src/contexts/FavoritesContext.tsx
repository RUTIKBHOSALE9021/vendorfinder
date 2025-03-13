
import React, { createContext, useContext, useState, useEffect } from "react";
import { Vendor } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface FavoritesContextType {
  favorites: Vendor[];
  addToFavorites: (vendor: Vendor) => void;
  removeFromFavorites: (vendorId: string) => void;
  isFavorite: (vendorId: string) => boolean;
  toggleFavorite: (vendor: Vendor) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Vendor[]>([]);
  const { toast } = useToast();

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error("Failed to parse favorites from localStorage", error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (vendor: Vendor) => {
    setFavorites((prev) => [...prev, vendor]);
    toast({
      title: "Added to Favorites",
      description: `${vendor.name} has been added to your favorites.`
    });
  };

  const removeFromFavorites = (vendorId: string) => {
    setFavorites((prev) => prev.filter((vendor) => vendor.id !== vendorId));
    toast({
      title: "Removed from Favorites",
      description: "Vendor has been removed from your favorites."
    });
  };

  const isFavorite = (vendorId: string) => {
    return favorites.some((vendor) => vendor.id === vendorId);
  };

  const toggleFavorite = (vendor: Vendor) => {
    if (isFavorite(vendor.id)) {
      removeFromFavorites(vendor.id);
    } else {
      addToFavorites(vendor);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
