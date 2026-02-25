import React, { useState, useEffect } from 'react';
import { UsersIcon, UserPlusIcon, ArrowPathIcon, ChartBarIcon } from '@heroicons/react/24/outline';

// --- Mock Data ---
const mockCustomerStats = {
  total: 850,
  newThisMonth: 120,
  repeatRate: 35.5,
};

const mockTopCustomers = [
  { name: 'Alice Johnson', email: 'alice.j@example.com', totalOrders: 15, totalSpent: 2550.75 },
  { name: 'Bob Williams', email: 'bob.w@example.com', totalOrders: 12, totalSpent: 2100.50 },
  { name: 'Charlie Brown', email: 'charlie.b@example.com', totalOrders: 10, totalSpent: 1850.00 },
  { name: 'Diana Miller', email: 'diana.m@example.com', totalOrders: 9, totalSpent: 1520.25 },
  { name: 'Ethan Davis', email: 'ethan.d@example.com', totalOrders: 8, totalSpent: 1350.00 },
];

const mockCustomerTrend = [
    { month: 'Jan', new: 80, repeat: 20 },
    { month: 'Feb', new: 95, repeat: 25 },
    { month: 'Mar', new: 110, repeat: 30 },
    { month: 'Apr', new: 105, repeat: 35 },
    { month: 'May', new: 120, repeat: 40 },
    { month: 'Jun', new: 130, repeat: 45 },
];

const CustomerReport: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg text-gray-600">Loading customer data...</p>
      </div>
    );
  }
  
  const maxTrend = Math.max(...mockCustomerTrend.map(d => d.new + d.repeat));

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-sm h-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <UsersIcon className="h-8 w-8 mr-3 text-blue-600" />
        Customer Report
      </h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard icon={UsersIcon} title="Total Customers" value={mockCustomerStats.total.toString()} color="text-blue-500" />
        <StatCard icon={UserPlusIcon} title="New This Month" value={mockCustomerStats.newThisMonth.toString()} color="text-green-500" />
        <StatCard icon={ArrowPathIcon} title="Repeat Rate" value={`${mockCustomerStats.repeatRate}%`} color="text-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Customer Trend Chart */}
        <div className="lg:col-span-2 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                <ChartBarIcon className="h-6 w-6 mr-2"/>
                New vs. Repeat
            </h3>
            <div className="flex justify-between items-end h-64 space-x-3">
                {mockCustomerTrend.map(({ month, new: newCustomers, repeat }) => (
                    <div key={month} className="flex flex-col items-center flex-1">
                        <div 
                            className="w-full flex flex-col justify-end items-center rounded-t-md overflow-hidden"
                            style={{ height: `${((newCustomers + repeat) / maxTrend) * 100}%` }}
                            title={`Total: ${newCustomers + repeat}`}>
                            <div className="w-full bg-green-400 hover:bg-green-500" style={{ height: `${(repeat / (newCustomers + repeat)) * 100}%`}} title={`Repeat: ${repeat}`}></div>
                            <div className="w-full bg-blue-400 hover:bg-blue-500" style={{ height: `${(newCustomers / (newCustomers + repeat)) * 100}%`}} title={`New: ${newCustomers}`}></div>
                        </div>
                        <p className="mt-2 text-xs text-gray-600 font-medium">{month}</p>
                    </div>
                ))}
            </div>
             <div className="mt-4 flex justify-center space-x-6 text-sm">
                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-400 mr-2"></span>New</div>
                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-green-400 mr-2"></span>Repeat</div>
            </div>
        </div>

        {/* Top Customers List */}
        <div className="lg:col-span-3 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Top Customers</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-sm text-gray-600 uppercase bg-gray-100">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Orders</th>
                  <th className="p-3 text-right">Total Spent</th>
                </tr>
              </thead>
              <tbody>
                {mockTopCustomers.map((customer) => (
                  <tr key={customer.email} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="p-3 font-medium text-gray-800">
                        <div>{customer.name}</div>
                        <div className='text-xs text-gray-500'>{customer.email}</div>
                    </td>
                    <td className="p-3 text-center text-gray-700">{customer.totalOrders}</td>
                    <td className="p-3 text-right text-gray-700 font-semibold">${customer.totalSpent.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, color }) => (
  <div className="bg-gray-100 p-6 rounded-lg shadow-sm flex items-center">
    <Icon className={`h-10 w-10 ${color} mr-4`} />
    <div>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export default CustomerReport;
