
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AddServiceForm from "@/components/AddServiceForm";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const AddService = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.vendor.user);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Add Your Service</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your service details to connect with potential clients.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Service Information</CardTitle>
              <CardDescription>
                Fill out the form below with your service details. All fields are required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AddServiceForm isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AddService;
