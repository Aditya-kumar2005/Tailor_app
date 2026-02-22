import React from "react";

const CustomerReport: React.FC = () => {
  const stats = { total: 200, repeat: 50 };

  return (
    <div className="text-center p-6">
      <h2 className="text-xl font-bold mb-4">Customer Report</h2>
      <p>Total Customers: {stats.total}</p>
      <p>Repeat Customers: {stats.repeat}</p>
    </div>
  );
};

export default CustomerReport;