import React from "react";
import { NavLink, Routes, Route, Outlet } from "react-router-dom";
import ProfileSettings from "./ProfileSettings";
import SystemSettings from "./SystemSettings";

const Settings: React.FC = () => {
  const linkStyle = {
    base: "px-4 py-2 rounded-t-lg transition-colors duration-200",
    active: "bg-blue-600 text-white font-semibold",
    inactive: "bg-gray-200 text-gray-700 hover:bg-gray-300",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Settings</h1>

      <nav className="flex mb-6">
        <NavLink
          to="profile"
          className={({ isActive }) => `${linkStyle.base} ${isActive ? linkStyle.active : linkStyle.inactive}`}
        >
          Profile
        </NavLink>
        <NavLink
          to="system"
          className={({ isActive }) => `${linkStyle.base} ${isActive ? linkStyle.active : linkStyle.inactive}`}
        >
          System
        </NavLink>
      </nav>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;
