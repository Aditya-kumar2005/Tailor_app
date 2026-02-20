import React from "react";

interface Props {
  title: string;
  value: string | number;
}

const DashboardCard: React.FC<Props> = ({ title, value }) => (
  <div className="bg-white shadow-md rounded p-4 text-center">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default DashboardCard;