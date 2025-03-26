import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Home, LogIn, UserPlus, LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/indexSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user  = useSelector((state: RootState) => state.vendor.user);
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

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
            {token ? (
              <>
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user?.full_name?.charAt(0)?.toUpperCase() || ""}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user.full_name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild size="sm">
                  <Link to="/login" className="flex items-center">
                    <LogIn className="h-4 w-4 mr-1 md:mr-2" />
                    <span className="hidden md:inline">Login</span>
                  </Link>
                </Button>
                <Button variant="ghost" asChild size="sm">
                  <Link to="/signup" className="flex items-center">
                    <UserPlus className="h-4 w-4 mr-1 md:mr-2" />
                    <span className="hidden md:inline">Sign up</span>
                  </Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
