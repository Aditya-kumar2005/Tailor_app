import React from "react";

interface Props {
  title: string;
  value: string | number;
}

const DashboardCard: React.FC<Props> = ({ title, value }) => (
  <div className="flex flex-col gap-15 shadow-md rounded text-center w-110 h-70">
    <h3 className="text-3xl font-semibold">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default DashboardCard;