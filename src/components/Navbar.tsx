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
    <nav className="fixed w-full bg-purple-800 text-white p-4 flex justify-between items-center ">
      <Link to="/" className="font-serif text-3xl font-bold hover:underline">Tailor Management System</Link>
      <div className="space-x-4">
        {/* Shared links */}
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>

        {/* Admin-only links */}
        {role === "Admin" && (
          <>
            <Link to="/customers" className="hover:underline">Customers</Link>
            <Link to="/staff" className="hover:underline">Staff</Link>
            <Link to="/reports/revenue" className="hover:underline">Reports</Link>
          </>
        )}

        {/* Admin + Staff links */}
        {(role === "Admin" || role === "Staff") && (
          <>
            <Link to="/orders" className="hover:underline">Orders</Link>
            <Link to="/inventory" className="hover:underline">Inventory</Link>
          </>
        )}

        {/* Admin + Customer links */}
        {(role === "Admin" || role === "Customer") && (
          <Link to="/payments" className="hover:underline">Payments</Link>
        )}

        {/* Logout */}
        {user.loggedIn && (
          <Link
            to={""}
            onClick={() => dispatch(logout())}
            className="bg-red-500 px-3 py-1 rounded ml-4"
          >
            Logout
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;