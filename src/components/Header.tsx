
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, LogIn } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">EventVendors</Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/add-listing">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Listing
              </Button>
            </Link>
            <Link to="/login">
              <Button size="sm">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
