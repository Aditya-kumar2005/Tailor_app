import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { logout } from "../slices/userSlice";
import { navLinks } from "../data/navLinks";
import type { Role } from "../data/navLinks";// Import the centralized links
import { Link } from "react-router-dom";

interface NavbarProps {
  toggleSidebar: () => void;
}

// --- Main Navbar Component ---
// const Navbar: React.FC = () => {
const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  const profileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setProfileMenuOpen(false);
    navigate("/login");
  };

  const userRole = user.profile?.role as Role;
  const accessibleLinks = navLinks.filter(link => user.loggedIn && link.allowedRoles.includes(userRole));

  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    `block md:inline-block px-3 py-2 rounded-md text-base font-medium transition-colors ${ 
      isActive 
      ? 'bg-blue-600 text-white' 
      : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* --- Logo / Brand ---*/}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-100 "
            >
               {/* <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg> */}
              ⏩
             </button>

             <NavLink to="/dashboard" className="text-xl font-bold text-blue-600 font-serif pr-30">
              TailorFlow
            </NavLink>
           </div>

          {/* --- Desktop Navigation --- */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {accessibleLinks.map(link => (
                <NavLink key={link.path} to={link.path} className={linkClassName}>
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            {/* --- Profile Dropdown (Desktop) --- */}
            {user.loggedIn && (
              <div className="hidden md:block ml-4 relative" ref={profileMenuRef}>
                <button onClick={() => setProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <span className="mr-2 text-gray-700">{user.profile?.name}</span>
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                    {user.profile?.name?.charAt(0).toUpperCase()}
                  </div>
                </button>
                {isProfileMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                    <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* --- Mobile Menu Button --- */}
            {user.loggedIn && (
              <div className="-mr-2 flex md:hidden" ref={mobileMenuRef}>
                <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 focus:outline-none">
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    {isMobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- Mobile Menu --- */}
      {isMobileMenuOpen && user.loggedIn && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {accessibleLinks.map(link => (
              <NavLink key={link.path} to={link.path} className={linkClassName} onClick={() => setMobileMenuOpen(false)}>
                {link.label}
              </NavLink>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
                <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {user.profile?.name?.charAt(0).toUpperCase()}
                </div>
              <div className="ml-3">
                <p className="text-base font-medium text-gray-800">{user.profile?.name}</p>
                <p className="text-sm font-medium text-gray-500">{user.profile?.email}</p>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
    </div>
  );
};

export default Navbar;
