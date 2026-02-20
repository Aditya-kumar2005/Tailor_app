import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { logout } from "../slices/userSlice";

const Navbar: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const role = user.profile?.role;

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="">Tailor Management System</h1>
      <div className="space-x-4">
        {/* Shared links */}
        <Link to="/dashboard">Dashboard</Link>

        {/* Admin-only links */}
        {role === "Admin" && (
          <>
            <Link to="/customers">Customers</Link>
            <Link to="/staff">Staff</Link>
            <Link to="/reports/revenue">Reports</Link>
          </>
        )}

        {/* Admin + Staff links */}
        {(role === "Admin" || role === "Staff") && (
          <>
            <Link to="/orders">Orders</Link>
            <Link to="/inventory">Inventory</Link>
          </>
        )}

        {/* Admin + Customer links */}
        {(role === "Admin" || role === "Customer") && (
          <Link to="/payments">Payments</Link>
        )}

        {/* Logout */}
        {user.loggedIn && (
          <button
            onClick={() => dispatch(logout())}
            className="bg-red-500 px-3 py-1 rounded ml-4"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;