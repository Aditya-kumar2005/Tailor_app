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
    <nav className="fixed w-full bg-white text-black p-4 flex justify-between items-center shadow-violet-700 ">
      <Link to="/" className="font-serif text-blue-600 text-3xl font-bold hover:underline">Tailor Management System</Link>
      <div className="space-x-4">
        {/* Shared links */}
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/tailor" className="hover:underline">TailorDashboard</Link>

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
            className="px-5 py-3 ml-4 border-blue-600 border-2 hover:text-white hover:bg-blue-600 rounded-xl"
          >
            Logout
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;