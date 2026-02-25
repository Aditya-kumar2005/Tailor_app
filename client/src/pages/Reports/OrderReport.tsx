import React, { useState, useEffect } from 'react';
import { ShoppingCartIcon, CheckCircleIcon, ClockIcon, TruckIcon } from '@heroicons/react/24/outline';

// --- Mock Data ---
const mockOrderStats = {
  total: 245,
  completed: 198,
  pending: 32,
  shipped: 15,
};

const mockRecentOrders = [
  { id: '#A58-B4C-94E', customer: 'John Doe', amount: 125.50, status: 'Completed' },
  { id: '#F12-G8H-32I', customer: 'Jane Smith', amount: 75.00, status: 'Pending' },
  { id: '#K5L-M9N-01P', customer: 'Sam Wilson', amount: 250.25, status: 'Shipped' },
  { id: '#Q2R-S6T-78U', customer: 'Alice Brown', amount: 55.75, status: 'Completed' },
  { id: '#V9W-X3Y-45Z', customer: 'Bob Johnson', amount: 180.00, status: 'Completed' },
];

// --- Utility to get status color ---
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed': return 'text-green-600 bg-green-100';
    case 'Pending': return 'text-yellow-600 bg-yellow-100';
    case 'Shipped': return 'text-blue-600 bg-blue-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

const OrderReport: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg text-gray-600">Loading order data...</p>
      </div>
    );
  }

  const total = mockOrderStats.total;
  const statusData = [
    { label: 'Completed', value: mockOrderStats.completed, color: 'bg-green-500' },
    { label: 'Pending', value: mockOrderStats.pending, color: 'bg-yellow-500' },
    { label: 'Shipped', value: mockOrderStats.shipped, color: 'bg-blue-500' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-sm h-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <ShoppingCartIcon className="h-8 w-8 mr-3 text-blue-600" />
        Order Report
      </h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={ShoppingCartIcon} title="Total Orders" value={mockOrderStats.total} color="text-blue-500" />
        <StatCard icon={CheckCircleIcon} title="Completed" value={mockOrderStats.completed} color="text-green-500" />
        <StatCard icon={ClockIcon} title="Pending" value={mockOrderStats.pending} color="text-yellow-500" />
        <StatCard icon={TruckIcon} title="Shipped" value={mockOrderStats.shipped} color="text-indigo-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Status Distribution */}
        <div className="lg:col-span-1 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Order Status</h3>
          <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden flex">
            {statusData.map(({ value, color, label }) => (
              <div
                key={label}
                className={`${color} h-full`}
                style={{ width: `${(value / total) * 100}%` }}
                title={`${label}: ${value}`}
              />
            ))}
          </div>
          <div className="mt-4 space-y-2">
            {statusData.map(({ label, value, color }) => (
              <div key={label} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${color}`}></span>
                  <span>{label}</span>
                </div>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-sm text-gray-600 uppercase bg-gray-100">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3 text-right">Amount</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockRecentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="p-3 font-medium text-gray-800">{order.id}</td>
                    <td className="p-3 text-gray-700">{order.customer}</td>
                    <td className="p-3 text-right text-gray-700">${order.amount.toFixed(2)}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
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

// A reusable StatCard component
interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: number;
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

export default OrderReport;
