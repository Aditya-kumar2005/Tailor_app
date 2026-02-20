import React, { useEffect, useState } from "react";
import api from "../../api";

interface Staff {
  id: number;
  name: string;
  role: string;
}

const StaffList: React.FC = () => {
  const [staff, setStaff] = useState<Staff[]>([]);

  useEffect(() => {
    api.get("/staff").then(res => setStaff(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Staff</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200"><th>Name</th><th>Role</th></tr>
        </thead>
        <tbody>
          {staff.map(s => (
            <tr key={s.id}><td>{s.name}</td><td>{s.role}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffList;