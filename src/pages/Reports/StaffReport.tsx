import React from "react";

const StaffReport: React.FC = () => {
  const stats = [
    { name: "Rahul", completed: 30 },
    { name: "Aditya", completed: 40 }
  ];

  return (
    <div className=" p-6 text-center">
      <h2 className="text-xl font-bold mb-4">Staff Report</h2>
      <ul>
        {stats.map((s, i) => (
          <li key={i}>{s.name}: {s.completed} orders completed</li>
        ))}
      </ul>
    </div>
  );
};

export default StaffReport;