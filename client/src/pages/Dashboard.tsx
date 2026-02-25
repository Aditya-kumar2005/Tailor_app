import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../api';
import DashboardCard from '../components/DashboardCard';
import type {RootState} from '../store';

interface DashboardData {
  activeOrders: number;
  monthlyRevenue: number;
  pendingPayments: number;
  lowStockItems: number;
}

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.profile);
  const orders= useSelector((state: RootState) => state.orders.list);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await api.get('/dashboard');
  //       setData(res.data);
  //     } catch (err) { 
  //       setError('Failed to fetch dashboard data.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-full text-lg">Loading Dashboard...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-full text-red-500 text-lg">{error}</div>;
  }

  return (
    <div className="md:p-8 p-5 ">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Welcome, {user?.email ?? 'User'}!</h1>
        <p className="text-md text-gray-500 mt-1">Here's a snapshot of your business today.</p>
      </header>

      <div className="grid grid-cols-2 gap-10 lg:h-10">
        <Link to="/orders">
          <DashboardCard 
            title="Active Orders" 
            value={data?.activeOrders ?? 0} 
            color="primary" 
          />
        </Link>

        <Link to="/reports/revenue">
          <DashboardCard 
            title="Revenue (This Month)" 
            value={`$${(data?.monthlyRevenue ?? 0).toLocaleString()}`} 
            color="secondary"
          />
        </Link>

        <Link to="/payments">
          <DashboardCard 
            title="Pending Payments" 
            value={data?.pendingPayments ?? 0} 
            color="accent"
          />
        </Link>

        <Link to="/inventory">
          <DashboardCard 
            title="Low Stock Items" 
            value={data?.lowStockItems ?? 0} 
            color="neutral"
          />
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
