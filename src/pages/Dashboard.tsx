import React from 'react'
import DashboardCard from '../components/DashboardCard';

const Dashboard: React.FC= () => (
      <div className=" grid grid-cols-2 p-30">
      <DashboardCard title="Active Orders" value="12"/>
      <DashboardCard title="Revenue (This Month)" value="$4,500"/>
      <DashboardCard title="Pending Payments" value="5"/>
      <DashboardCard title="Low Stock Alerts" value="3"/>
    </div>
)
export default Dashboard;
