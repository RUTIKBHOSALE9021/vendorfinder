import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { initUser } from "@/redux/indexSlice";

const AuthCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      toast.error(error);
      navigate("/login");
      return;
    }

    if (token) {
      // Store token in localStorage
      localStorage.setItem("token", token);
  
      const user = {
        token: token,
        user: {
          id: searchParams.get("id") || "123",
          full_name: searchParams.get("name") || "John Doe",
          email: searchParams.get("email") || "john.doe@example.com",
        },
      };
      dispatch(initUser(user));
      
      toast.success("Successfully signed in!");
      navigate("/");
    } else {
      toast.error("Authentication failed");
      navigate("/login");
    }
  }, [navigate, searchParams, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Completing sign in...</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
      </div>
    </div>
  );
};

export default AuthCallback; 