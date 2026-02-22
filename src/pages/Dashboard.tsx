import React from 'react'
import DashboardCard from '../components/DashboardCard';
import TailorDashboard from './Tailor/TailorDashboard';

const Dashboard: React.FC= () => (
    <div className="grid grid-rows-2" >
      <div className=" pt-8"><TailorDashboard/></div>
      <div className=" grid grid-cols-2 pl-30">
      <DashboardCard title="Active Orders" value="12"/>
      <DashboardCard title="Revenue (This Month)" value="$4,500"/>
      <DashboardCard title="Pending Payments" value="5"/>
      <DashboardCard title="Low Stock Alerts" value="3"/>
    </div>
    </div>
)
export default Dashboard;
