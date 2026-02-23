import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const Sidebar: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const role = user.profile?.role;
  return(
    <aside className="w-64 h-svh bg-black pt-2.5 text-xl text-center">
    <ul className="space-y-4">
      {/* Shared links */}
      <li>
        <Link to="/dashboard"  className="hover:underline ">Dashboard</Link>
      </li>
      <hr/>
      <li>
        <Link to="/tailor" className="hover:underline">TailorDashboard</Link>
      </li>
      <hr/>

      {/* Admin-only links */}
      {role === "Admin" && (
          <>
          <li><Link to="/customers" className="hover:underline ">Customers</Link></li>
          <hr />
          <li><Link to="/staff" className="hover:underline ">Staff</Link></li>
          <hr/>
          <li><Link to="/reports/revenue" className="hover:underline ">Reports</Link></li>
          <hr/>
        </>
      )}

      {/* Admin + Staff links */}

      {(role === "Admin" || role === "Staff") && (
        <>
          <li><Link to="/orders" className="hover:underline ">Orders</Link></li>
          <hr/>
          <li><Link to="/inventory" className="hover:underline ">Inventory</Link></li>
          <hr/>
                  
        </>
      )}
      
      {/* Admin + Customer links */}

      {(role === "Admin" || role === "Customer") && (
          <li><Link to="/payments" className="hover:underline ">Payments</Link></li>
      )}
    </ul>
  </aside>
  );
};

export default Sidebar;