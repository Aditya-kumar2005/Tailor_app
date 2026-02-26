import React, { useState, useEffect } from 'react';
import { BriefcaseIcon, UserGroupIcon, StarIcon, ChartBarIcon } from '@heroicons/react/24/outline';

// --- Mock Data ---
const mockStaffStats = {
  total: 25,
  active: 22,
  avgPerformance: 8.5, // Out of 10
};

const mockTopPerformers = [
  { name: 'Rahul Gupta', role: 'Lead Tailor', ordersCompleted: 152, rating: 4.9 },
  { name: 'Aditya Singh', role: 'Senior Tailor', ordersCompleted: 138, rating: 4.8 },
  { name: 'Priya Sharma', role: 'Pattern Master', ordersCompleted: 125, rating: 4.9 },
  { name: 'Amit Kumar', role: 'Finishing Specialist', ordersCompleted: 145, rating: 4.7 },
  { name: 'Sunita Devi', role: 'Junior Tailor', ordersCompleted: 110, rating: 4.6 },
];

const mockPerformanceData = [
    { name: 'Rahul G.', value: 95 },
    { name: 'Aditya S.', value: 92 },
    { name: 'Priya S.', value: 88 },
    { name: 'Amit K.', value: 85 },
    { name: 'Sunita D.', value: 82 },
    { name: 'Neha V.', value: 78 },
    { name: 'Sanjay M.', value: 75 },
];

const StaffReport: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg text-gray-600">Loading staff data...</p>
      </div>
    );
  }

  // const maxPerformance = 100;

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-sm h-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <BriefcaseIcon className="h-8 w-8 mr-3 text-blue-600" />
        Staff Report
      </h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard icon={UserGroupIcon} title="Total Staff" value={mockStaffStats.total.toString()} color="text-blue-500" />
        <StatCard icon={BriefcaseIcon} title="Active Staff" value={mockStaffStats.active.toString()} color="text-green-500" />
        <StatCard icon={StarIcon} title="Avg. Performance" value={`${mockStaffStats.avgPerformance}/10`} color="text-yellow-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <ChartBarIcon className="h-6 w-6 mr-2"/>
            Performance Score
          </h3>
          <div className="space-y-4">
            {mockPerformanceData.map(({ name, value }) => (
                <div key={name} className="w-full">
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{name}</span>
                        <span className="text-sm font-medium text-gray-500">{value}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-gray-200 rounded-full">
                        <div 
                            className="bg-blue-500 h-2.5 rounded-full"
                            style={{ width: `${value}%` }}
                        ></div>
                    </div>
                </div>
            ))}
          </div>
        </div>

        {/* Top Performers List */}
        <div className="lg:col-span-3 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Top Performers</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-sm text-gray-600 uppercase bg-gray-100">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3 text-center">Orders Completed</th>
                  <th className="p-3 text-center">Rating</th>
                </tr>
              </thead>
              <tbody>
                {mockTopPerformers.map((staff) => (
                  <tr key={staff.name} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="p-3 font-medium text-gray-800">
                        <div>{staff.name}</div>
                        <div className="text-xs text-gray-500">{staff.role}</div>
                    </td>
                    <td className="p-3 text-center text-gray-700 font-bold">{staff.ordersCompleted}</td>
                    <td className="p-3 text-center text-yellow-500 font-semibold flex items-center justify-center">
                        <StarIcon className="h-5 w-5 mr-1"/> {staff.rating.toFixed(1)}
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

export default StaffReport;
