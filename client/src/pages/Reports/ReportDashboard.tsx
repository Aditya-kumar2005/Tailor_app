import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ChartBarIcon, ShoppingCartIcon, UsersIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const ReportDashboard: React.FC = () => {
  const navLinks = [
    { to: '/reports/revenue', label: 'Revenue', icon: CurrencyDollarIcon },
    { to: '/reports/order', label: 'Orders', icon: ShoppingCartIcon },
    { to: '/reports/customer', label: 'Customers', icon: UsersIcon },
    { to: '/reports/staff', label: 'Staff', icon: ChartBarIcon },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row min-h-screen bg-gray-50">
      
      {/* Sidebar Navigation */}
      <aside className="w-full sm:w-64 bg-white p-6 rounded-lg shadow-md mb-6 sm:mb-0 sm:mr-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Reports</h2>
        <nav className="space-y-2">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-lg font-medium rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-200'
                }`
              }
            >
              <Icon className="h-6 w-6 mr-3" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-white p-6 rounded-lg shadow-md">
        <div className="border-2 border-dashed border-gray-200 rounded-lg h-full p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ReportDashboard;
