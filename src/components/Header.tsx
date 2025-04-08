
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setUser, clearUser } from "@/redux/vendorSlice";
import { Home, Heart, MessageCircle, PlusCircle } from "lucide-react";

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.vendor.user);
  const userData = localStorage.getItem("user");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (userData) {
      const parsedUser = JSON.parse(userData);
      dispatch(setUser(parsedUser));
    }
  }, [dispatch, userData]);

  const handleLogout = async () => {
    await logout();
    dispatch(clearUser());
    navigate("/login");
    setIsMenuOpen(false);
  };

  const menuItems = [
    {
      name: "Home",
      href: "/",
      icon: <Home size={16} />,
    },
    {
      name: "Favorites",
      href: "/favorites",
      icon: <Heart size={16} />,
    },
    {
      name: "Messages",
      href: "/messages",
      icon: <MessageCircle size={16} />,
    },
    {
      name: "Add Service",
      href: "/add-service",
      icon: <PlusCircle size={16} />,
    },
  ];

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Vendor Finder
        </Link>
        <div>
          {user ? (
            <div className="flex items-center w-full">
              <nav className="hidden md:flex items-center mr-6 space-x-6">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center text-gray-800 hover:text-gray-900 transition-colors duration-200"
                  >
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                  </Link>
                ))}
              </nav>
              <div className="flex items-center space-x-6">
                <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="Shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.full_name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => navigate("/profile")}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => navigate("/settings")}>
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline">Log In</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
