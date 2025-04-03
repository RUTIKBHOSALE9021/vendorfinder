
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Mail, Phone, MapPin, DollarSign, Star, Heart, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatInterface from "@/components/ChatInterface";
import { addVendorToFavorite, getVendorById, removeVendorToFavorite } from "@/api";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Vendor } from "@/types";
import { useEffect, useState } from "react";

const VendorDetail = () => {
  const { id } = useParams();
  const [currentVendor, setCurrentVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.vendor.user);

  useEffect(() => {
    const fetchCurrentVendor = async () => {
      setLoading(true);
      setError(null);
      try {
        const vendor = await getVendorById(id!);
        setCurrentVendor(vendor.vendor);
      } catch (err) {
        console.error("Error fetching vendor:", err);
        setError("Failed to fetch vendor details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentVendor();
  }, [id]);

  const addToFavorite = async (user_id: string, vendor_id: string) => {
    try {
      await addVendorToFavorite({ user_id, vendor_id });
    } catch (error) {
      console.error("Failed to add to favorites:", error);
      alert(error.message || "Failed to add to favorites");
    }
  };

  const removeFromFavorite = async (user_id: string, vendor_id: string) => {
    try {
      await removeVendorToFavorite({ user_id, vendor_id });
    } catch (error) {
      console.error("Failed to remove from favorites:", error);
      alert(error.message || "Failed to remove from favorites");
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent, vendor: Vendor) => {
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

  const favorited = currentVendor?.favorite || false;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading Vendor Details...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!currentVendor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Vendor Not Found</h1>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center mb-6 text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Vendors
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="rounded-lg overflow-hidden mb-6">
              <img 
                src={currentVendor.image} 
                alt={currentVendor.name} 
                className="w-full h-[400px] object-cover"
              />
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold">{currentVendor.name}</h1>
              <Button 
                variant={favorited ? "default" : "outline"} 
                size="icon"
                onClick={(e) => handleFavoriteClick(e,currentVendor)}
                className={favorited ? "bg-red-500 hover:bg-red-600" : ""}
              >
                <Heart className={`h-5 w-5 ${favorited ? "fill-white" : ""}`} />
              </Button>
            </div>
            
            <div className="flex items-center mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {currentVendor.category}
              </span>
              <div className="flex items-center ml-4">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="ml-1 font-medium">{currentVendor.rating}</span>
              </div>
              <div className="flex items-center ml-4">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="ml-1 text-gray-600">{currentVendor.location}</span>
              </div>
            </div>
            
            <Tabs defaultValue="about" className="mb-8">
              <TabsList>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="chat">Chat</TabsTrigger>
              </TabsList>
              <TabsContent value="about">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">About</h2>
                    <p className="text-gray-700 leading-relaxed">{currentVendor.description}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="chat">
                <ChatInterface vendorId={currentVendor.id} vendorName={currentVendor.name} />
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{currentVendor.contactEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{currentVendor.contactPhone}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <DollarSign className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Pricing</p>
                      <p className="font-medium">{currentVendor.pricing}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <Button className="w-full flex gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Contact Vendor
                  </Button>
                  <Button 
                    variant={favorited ? "default" : "outline"} 
                    className={`w-full flex gap-2 ${favorited ? "bg-red-500 hover:bg-red-600" : ""}`}
                    onClick={(e) => handleFavoriteClick(e,currentVendor)}
                  >
                    <Heart className={`h-4 w-4 ${favorited ? "fill-white" : ""}`} />
                    {favorited ? "Remove from Favorites" : "Add to Favorites"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VendorDetail;
