
import { Vendor } from "@/types";
import VendorCard from "./VendorCard";

interface VendorListProps {
  vendors: Vendor[];
}

const VendorList = ({ vendors }: VendorListProps) => {
  if (vendors.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No vendors found</h3>
        <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vendors.map((vendor) => (
        <VendorCard key={vendor.id} vendor={vendor} />
      ))}
    </div>
  );
};

export default VendorList;
