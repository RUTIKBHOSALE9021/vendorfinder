import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.vendor);

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link to="/" className="font-bold text-xl">
          VendorFinder
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          {user && (
            <>
              <Link to="/favorites" className="text-sm font-medium hover:text-primary">
                Favorites
              </Link>
              <UserAvatar />
            </>
          )}
          {!user && (
            <>
              <Link to="/login" className="text-sm font-medium hover:text-primary">
                Login
              </Link>
              <Link to="/signup" className="text-sm font-medium hover:text-primary">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 