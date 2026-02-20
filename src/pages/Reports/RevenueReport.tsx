import React from "react";

const RevenueReport: React.FC = () => {
  const data = [
    { month: "January", revenue: 4500 },
    { month: "February", revenue: 5200 }
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Revenue Report</h2>
      <ul>
        {data.map((d, i) => (
          <li key={i}>{d.month}: ${d.revenue}</li>
        ))}
      </ul>
    </div>
  );
};

export default RevenueReport;