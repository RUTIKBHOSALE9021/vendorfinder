
import { useParams, Link } from "react-router-dom";
import { vendors } from "@/data/vendors";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Mail, Phone, MapPin, DollarSign, Star, Heart, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatInterface from "@/components/ChatInterface";

const VendorDetail = () => {
  const { id } = useParams();
  const vendor = vendors.find((v) => v.id === id);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!vendor) {
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

  const favorited = isFavorite(vendor.id);

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
                src={vendor.image} 
                alt={vendor.name} 
                className="w-full h-[400px] object-cover"
              />
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold">{vendor.name}</h1>
              <Button 
                variant={favorited ? "default" : "outline"} 
                size="icon"
                onClick={() => toggleFavorite(vendor)}
                className={favorited ? "bg-red-500 hover:bg-red-600" : ""}
              >
                <Heart className={`h-5 w-5 ${favorited ? "fill-white" : ""}`} />
              </Button>
            </div>
            
            <div className="flex items-center mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {vendor.category}
              </span>
              <div className="flex items-center ml-4">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="ml-1 font-medium">{vendor.rating}</span>
              </div>
              <div className="flex items-center ml-4">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="ml-1 text-gray-600">{vendor.location}</span>
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
                    <p className="text-gray-700 leading-relaxed">{vendor.description}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="chat">
                <ChatInterface vendorId={vendor.id} vendorName={vendor.name} />
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
                      <p className="font-medium">{vendor.contactEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{vendor.contactPhone}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <DollarSign className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Pricing</p>
                      <p className="font-medium">{vendor.pricing}</p>
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
                    onClick={() => toggleFavorite(vendor)}
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
