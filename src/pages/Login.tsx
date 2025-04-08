import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login as loginAction } from "@/redux/vendorSlice";
import { setUser } from "@/redux/vendorSlice";
import { RootState } from "@/redux/store";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api";
import { googleAuth } from "@/api";
import { User } from "@/types";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const userData = useSelector((state: RootState) => state.vendor.user);
  // Fix the error by correctly typing useState with User | null
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fix: Check if userData exists and then correctly set the user state
    if (userData) {
      dispatch(setUser(userData));
      setUser(userData);
    }
  }, [userData, dispatch]);

  const loginMutation = useMutation(login, {
    onSuccess: (data) => {
      dispatch(loginAction(data));
      localStorage.setItem("token", data.token);
      toast({
        title: "Login successful!",
        description: "You have successfully logged in.",
      });
      navigate("/");
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Login failed.",
        description: error.message || "Invalid credentials.",
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleLogin = async () => {
    setIsLoading(true);
    loginMutation.mutate({ email, password });
  };

  const handleGoogleAuth = async () => {
    try {
      await googleAuth();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Google authentication failed.",
        description: error.message || "Could not authenticate with Google.",
      });
    }
  };

  if (user) {
    navigate("/");
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-4">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button onClick={handleLogin} disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
          <div className="text-center">
            <Button variant="outline" onClick={handleGoogleAuth}>
              Login with Google
            </Button>
          </div>
          <div className="text-sm text-gray-500 text-center">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
