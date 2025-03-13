
import { useParams, Link } from "react-router-dom";
import { vendors } from "@/data/vendors";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Mail, Phone, MapPin, DollarSign, Star } from "lucide-react";
import Header from "@/components/Header";

const VendorDetail = () => {
  const { id } = useParams();
  const vendor = vendors.find((v) => v.id === id);

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
            
            <h1 className="text-3xl font-bold mb-2">{vendor.name}</h1>
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
            
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <p className="text-gray-700 leading-relaxed">{vendor.description}</p>
              </CardContent>
            </Card>
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
                  <Button className="w-full">Contact Vendor</Button>
                  <Button variant="outline" className="w-full">Add to Favorites</Button>
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
