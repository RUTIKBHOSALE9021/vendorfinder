
import { useState } from "react";
import { vendors } from "@/data/vendors";
import SearchBar from "@/components/SearchBar";
import VendorList from "@/components/VendorList";
import { Vendor } from "@/types";
import CategoryFilter from "@/components/CategoryFilter";
import Header from "@/components/Header";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory ? vendor.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find the Perfect Vendor for Your Event</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with top-rated photographers, caterers, venues, and more for your special occasion.
          </p>
        </div>

        <div className="mb-8">
          <SearchBar query={searchQuery} setQuery={setSearchQuery} />
        </div>

        <div className="mb-8">
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
          />
        </div>

        <VendorList vendors={filteredVendors} />
      </main>
    </div>
  );
};

export default Index;
