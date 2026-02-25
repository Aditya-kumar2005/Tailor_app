import React, { useState, useEffect } from 'react';
import { ChartBarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

// --- Mock Data ---
// In a real application, this would come from an API call
const mockRevenueData = [
  { month: 'Jan', revenue: 6500 },
  { month: 'Feb', revenue: 5900 },
  { month: 'Mar', revenue: 8000 },
  { month: 'Apr', revenue: 8100 },
  { month: 'May', revenue: 5600 },
  { month: 'Jun', revenue: 5500 },
  { month: 'Jul', revenue: 4000 },
  { month: 'Aug', revenue: 6200 },
  { month: 'Sep', revenue: 7100 },
  { month: 'Oct', revenue: 7800 },
  { month: 'Nov', revenue: 9500 },
  { month: 'Dec', revenue: 10200 },
];

const totalRevenue = mockRevenueData.reduce((acc, item) => acc + item.revenue, 0);
const monthlyAverage = totalRevenue / mockRevenueData.length;
const yoyGrowth = 15.3; // Dummy percentage

const RevenueReport: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Simulate network delay
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg text-gray-600">Loading revenue data...</p>
      </div>
    );
  }
  
  const maxRevenue = Math.max(...mockRevenueData.map(d => d.revenue));

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-sm h-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <CurrencyDollarIcon className="h-8 w-8 mr-3 text-blue-600" />
        Revenue Report
      </h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm flex items-center">
          <CurrencyDollarIcon className="h-10 w-10 text-green-500 mr-4" />
          <div>
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm flex items-center">
          <ChartBarIcon className="h-10 w-10 text-yellow-500 mr-4" />
          <div>
            <p className="text-sm text-gray-600">Monthly Average</p>
            <p className="text-3xl font-bold text-gray-900">${monthlyAverage.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          </div>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm flex items-center">
          {/* <TrendingUpIcon className="h-10 w-10 text-red-500 mr-4" /> */}
          <div>
            <p className="text-sm text-gray-600">Year-over-Year</p>
            <p className="text-3xl font-bold text-gray-900">{yoyGrowth}%</p>
          </div>
        </div>
      </div>

      {/* Monthly Revenue Chart */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Monthly Breakdown</h3>
        <div className="flex justify-between items-end h-64 space-x-2">
          {mockRevenueData.map((data) => (
            <div key={data.month} className="flex flex-col items-center flex-1">
              <div 
                className="w-full bg-blue-500 rounded-t-md hover:bg-blue-600 transition-colors"
                style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                title={`$${data.revenue.toLocaleString()}`}
              ></div>
              <p className="mt-2 text-xs text-gray-600 font-medium">{data.month}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueReport;
