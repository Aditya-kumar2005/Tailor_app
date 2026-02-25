import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

interface ProtectedRouteProps {
  children: React.ReactElement;
  allowedRoles: string[];
}

/**
 * A component to protect routes based on user authentication and roles.
 * It redirects unauthenticated users to the login page and shows an
 * access denied message for users without the required role.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { loggedIn, profile } = useSelector((state: RootState) => state.user);

  // 1. Check if the user is logged in
  if (!loggedIn) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  // 2. Check if the user has the required role
  const userRole = profile?.role;
  if (!userRole || !allowedRoles.includes(userRole)) {
    // User is logged in but does not have permission. 
    // Show an "Access Denied" message or a dedicated component.
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-lg text-gray-700">
          You do not have the necessary permissions to view this page.
        </p>
        <Navigate to="/dashboard" replace />
      </div>
    );
  }

  // 3. If authenticated and authorized, render the child component
  return children;
};

export default ProtectedRoute;
