
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { createVendor } from "@/api";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { VendorRequest } from "@/types/apiReq";

// Define the validation schema
const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),
  contactEmail: z.string().email("Invalid email address"),
  contactPhone: z.string().min(10, "Valid phone number required"),
  pricing: z.string().min(1, "Pricing information is required"),
  image: z.string().min(1, "Image URL is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface AddServiceFormProps {
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
}

const categoryOptions = [
  "Photography",
  "Catering",
  "Venue",
  "Music",
  "Decoration",
  "Transportation",
  "Videography",
  "Wedding Planning",
  "Florist",
  "Other"
];

const AddServiceForm = ({ isSubmitting, setIsSubmitting }: AddServiceFormProps) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.vendor.user);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      location: "",
      contactEmail: "",
      contactPhone: "",
      pricing: "",
      image: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!user) {
      toast.error("You must be logged in to add a service");
      return;
    }

    setIsSubmitting(true);
    try {
      // Convert the form data to the correct VendorRequest type
      const vendorRequest: VendorRequest = {
        name: data.name,
        description: data.description,
        category: data.category,
        location: data.location,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        pricing: Number(data.pricing),
        image: data.image,
        rating: 0 // Default rating for new services
      };

      await createVendor(vendorRequest);
      toast.success("Service added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error("Failed to add service. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Placeholder image URLs for demo
  const placeholderImages = [
    "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070",
    "https://images.unsplash.com/photo-1551434678-33b267ca4811?q=80&w=2070",
    "https://images.unsplash.com/photo-1603486002664-a5636b612e28?q=80&w=2070",
    "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2070"
  ];

  const selectImage = (url: string) => {
    form.setValue("image", url);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your service name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your service in detail" 
                  className="min-h-[120px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                  >
                    <option value="" disabled>Select a category</option>
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="City, State" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="your@email.com" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Phone</FormLabel>
                <FormControl>
                  <Input 
                    type="tel" 
                    placeholder="Phone number" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="pricing"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pricing ($)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Enter your price" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Image</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                {placeholderImages.map((image, index) => (
                  <div
                    key={index}
                    className={`relative aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${
                      field.value === image ? "border-primary" : "border-transparent"
                    }`}
                    onClick={() => selectImage(image)}
                  >
                    <img
                      src={image}
                      alt={`Sample ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <FormControl>
                <Input 
                  placeholder="Or enter image URL" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate(-1)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding Service..." : "Add Service"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddServiceForm;
