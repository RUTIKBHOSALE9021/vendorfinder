import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import VendorList from "@/components/VendorList";
import { Vendor } from "@/types";
import CategoryFilter from "@/components/CategoryFilter";
import Header from "@/components/Header";
import { getAllVendors } from "@/api";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Index = () => {
  const user = useSelector((state: RootState) => state.vendor.user);
  const refresh = useSelector((state: RootState) => state.vendor.getallVendors);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchVendors = async (showLoading = false) => {
    if (!user || !user.id) return;
    
    if (showLoading) setLoading(true);
    
    try {
      const response = await getAllVendors(user.id);
      setVendors(response.vendors || []);
    } catch (error) {
      console.error("Error fetching vendors:", error);
      toast.error("Failed to fetch vendors");
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors(true);
  }, [user?.id]);


  useEffect(() => {
      fetchVendors(false);
  }, [refresh]);

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch = 
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filteredVendors.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No vendors found</h3>
            <p className="text-gray-600">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        ) : (
          <VendorList vendors={filteredVendors} />
        )}
      </main>
    </div>
  );
};

export default Index;