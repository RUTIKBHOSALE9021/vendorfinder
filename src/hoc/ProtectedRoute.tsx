import { RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

type ProtectedRouteProps = {
  path: string;
  element: JSX.Element;
};

const ProtectedRoute = ({ path, element }: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.vendor.user);

  if (!user || !user.id) {
    return <Navigate to="/login" replace />;
  }

  return <Route path={path} element={element} />;
};

export default ProtectedRoute;
