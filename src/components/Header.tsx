import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Home, LogIn, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const Header = () => {
  const user = useSelector((state) => state.vendor.users);
  const [userData, setUserData] = useState();
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        setUserData(user);
      }
    }, [user]);
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            EventVendors
          </Link>

          <nav className="flex items-center space-x-1 md:space-x-2">
            <Button variant="ghost" asChild size="sm">
              <Link to="/" className="flex items-center">
                <Home className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">Home</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild size="sm">
              <Link to="/favorites" className="flex items-center">
                <Heart className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">Favorites</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild size="sm">
              <Link to="/messages" className="flex items-center">
                <MessageCircle className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">Messages</span>
              </Link>
            </Button>
       
              <Avatar>
                <AvatarFallback>{userData?.user?.full_name?.charAt(0)}</AvatarFallback>
              </Avatar>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
