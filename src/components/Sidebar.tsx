import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { navLinks} from "../data/navLinks";
import type { Role } from "../data/navLinks"; // Import the centralized links

const Sidebar: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const userRole = user.profile?.role as Role;

  // Filter links based on user's role
  const accessibleLinks = navLinks.filter(link => 
    user.loggedIn && link.allowedRoles.includes(userRole)
  );

  // Define the class names for active and inactive links
  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-3 text-lg font-medium rounded-lg transition-colors duration-200 ${ 
      isActive 
      ? 'bg-blue-600 text-white shadow-lg' 
      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <aside className="w-64 h-full bg-gray-800 text-white p-4 flex flex-col">
      <div className="flex items-center mb-8">
        {/* You can place a logo here if you have one */}
        <h1 className="text-2xl font-bold text-white">Menu</h1>
      </div>
      
      <nav className="flex-grow">
        <ul className="space-y-2">
          {accessibleLinks.map(link => (
            <li key={link.path}>
              <NavLink to={link.path} className={linkClassName}>
                <link.icon />
                <span className="ml-3">{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} TailorFlow</p>
      </div>
    </aside>
  );
};

export default Sidebar;
