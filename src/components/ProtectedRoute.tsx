// ...existing code...
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

interface ProtectedRouteProps {
  children: React.ReactElement;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const user = useSelector((state: RootState) => state.user);

  if (!user.loggedIn) {
    return <Navigate to="/login" replace />;
  }

  // ensure profile exists before checking role
  if (user.profile && !allowedRoles.includes(user.profile.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
// ...existing code...