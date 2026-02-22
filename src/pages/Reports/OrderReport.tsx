import React from "react";

const OrderReport: React.FC = () => {
  const stats = { total: 120, completed: 100, pending: 20 };

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold mb-4">Order Report</h2>
      <p>Total Orders: {stats.total}</p>
      <p>Completed: {stats.completed}</p>
      <p>Pending: {stats.pending}</p>
    </div>
  );
};

export default OrderReport;